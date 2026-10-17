import { signupPostRequestBodySchema, loginPostRequestBodySchema, googleAuthPostRequestBodySchema } from '../validations/request.validation.js'
import { hashPasswordWithSalt } from '../utils/hash.js'
import { createUser, getUserByEmail, linkUserGoogle } from '../services/user.service.js'
import { createUserToken } from '../utils/token.js'
import { OAuth2Client } from 'google-auth-library'

const googleAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (req,res) =>{
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(
        req.body
    );

    if(validationResult.error){
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { firstname , lastname , email , password } = validationResult.data;

    if(!firstname || !email || !password){
        return res.status(400).json({error: "Please fill all the fiels "} );
    }

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return res
            .status(400)
            .json({ error: `User with email ${email} already exists` });
    }

    const { salt , password: hashedPassword } = hashPasswordWithSalt(password);

    const userData = {
        firstname,
        lastname,
        email,
        hashedPassword,
        salt
    };

    const user = await createUser(userData);

    return res.status(201).json({
        success: true,
        message: "User signed up successfully",
        user,
    });
};

export const login = async (req, res) => {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(
        req.body
    );

    if(validationResult.error){
        return res.status(400).json({ error: validationResult.error.format() });
    }
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if(!user){
        return res.status(404).json({ error: "Invalid Email or Password" });
    }

    if(!user.password){
        return res.status(400).json({ error: "This account was created with Google. Please continue with Google instead" });
    }

    const { password: newHashedPassword } = hashPasswordWithSalt(password,user.salt);

    if (user.password !== newHashedPassword) {
        return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const token = await createUserToken({id: user.id})

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        },
    });
}

export const authWithGoogle = async (req, res) => {
    const validationResult = await googleAuthPostRequestBodySchema.safeParseAsync(
        req.body
    );

    if(validationResult.error){
        return res.status(400).json({ error: validationResult.error.format() });
    }

    const { credential } = validationResult.data;

    // Verify the Google ID token cryptographically + against our client id
    let googleUser;
    try {
        const ticket = await googleAuthClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        googleUser = ticket.getPayload();
    } catch (error) {
        return res
            .status(401)
            .json({ error: "Google sign-in failed. Please try again" });
    }

    if(!googleUser.email_verified){
        return res
            .status(401)
            .json({ error: "Your Google account email is not verified" });
    }

    const googleId = googleUser.sub;
    const email = googleUser.email.toLowerCase();

    let user = await getUserByEmail(email);

    if(user && user.googleId && user.googleId !== googleId){
        return res
            .status(409)
            .json({ error: "This email is already linked to a different Google account" });
    }

    if(user && !user.googleId){
        // Existing email/password user -> link the Google account
        user = await linkUserGoogle({ userId: user.id, googleId, picture: googleUser.picture });
    }

    if(!user){
        // No account yet -> sign the user up via Google
        user = await createUser({
            firstname: googleUser.given_name || googleUser.name || 'User',
            lastname: googleUser.family_name,
            email,
            googleId,
            picture: googleUser.picture,
        });
    }

    const token = await createUserToken({ id: user.id });

    return res.status(200).json({ token, user });
};
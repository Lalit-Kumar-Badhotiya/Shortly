import { signupPostRequestBodySchema, loginPostRequestBodySchema } from '../validations/request.validation.js'
import { hashPasswordWithSalt } from '../utils/hash.js'
import { createUser, getUserByEmail } from '../services/user.service.js'
import { createUserToken } from '../utils/token.js'

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

    const user = await getUserByEmail(email);

    if(!user){
        return res.status(404).json({ error: "Invalid Email or Password" });
    }

    const { password: newHashedPassword } = hashPasswordWithSalt(password,user.salt);

    if (user.password !== newHashedPassword) {
        return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const token = await createUserToken({id: user.id})

    return res.status(200).json({ token });
}
import { validateUserToken } from '../utils/token.js'

export function authenticationMiddleware(req,res,next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) return next();

    if(!authHeader.startsWith("Bearer")){
        return res 
            .status(400)
            .json({ error: "Authorization header must start with bearer" });
    }

    const token = authHeader.split(" ")[1];

    console.log("token received in middleware :- ",token);

    const decoded = validateUserToken(token);

    if(!decoded){
        return res.status(400).json({ error: "Invalid token" });
    }

    console.log("User auth middleware :-",decoded);

    req.user=decoded;

    console.log("req.user :-",decoded);

    return next();
}

export const ensureAuthenticated = async function (req, res , next){
    if(!req.user || !req.user.id){
        return res.status(400).json({ error: "You must be logged in to continue" })
    }

    next();
};
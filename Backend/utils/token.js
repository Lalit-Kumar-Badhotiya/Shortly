import { userTokenSchema } from '../validations/token.validation.js'
import jwt from 'jsonwebtoken'

export const createUserToken = async (payload) =>{
    const validationResult = await userTokenSchema.safeParseAsync(payload);

    if(validationResult.error) throw new Error(validationResult.error.message);

    const payloadValidationData = validationResult.data;

    const token = jwt.sign(payloadValidationData, process.env.JWT_SECRET);

    console.log("user token created :- ",token);

    return token;
};

export const validateUserToken = (token) => {
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        return payload;
    }catch(error){
        return null
    }
};
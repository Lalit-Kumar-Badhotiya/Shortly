import { eq } from 'drizzle-orm';
import db from '../db/index.js';
import { usersTable } from '../models/index.js';

export const getUserByEmail = async (email) => {
    const [existingUser] = await db 
        .select({
            id: usersTable.id,
            salt: usersTable.salt,
            password: usersTable.password
        })
        .from(usersTable)
        .where(eq(usersTable.email,email));

    return existingUser
};

export const createUser = async (userData) => {
    const [user] = await db 
        .insert(usersTable)
        .values({
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            password: userData.hashedPassword,
            salt: userData.salt,
        })
        .returning({ id: usersTable.id });
    
    return user;
};
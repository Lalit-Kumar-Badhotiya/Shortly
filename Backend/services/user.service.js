import { eq } from 'drizzle-orm';
import db from '../db/index.js';
import { usersTable } from '../models/index.js';

export const getUserByEmail = async (email) => {
    const [existingUser] = await db
        .select({
            id: usersTable.id,
            firstname: usersTable.firstname,
            lastname: usersTable.lastname,
            email: usersTable.email,
            password: usersTable.password,
            salt: usersTable.salt,
            googleId: usersTable.googleId,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email));

    return existingUser;
};

export const createUser = async (userData) => {
    const [user] = await db
        .insert(usersTable)
        .values({
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            // password/salt are only set for email signups (null for Google accounts)
            password: userData.hashedPassword,
            salt: userData.salt,
            googleId: userData.googleId,
            picture: userData.picture,
        })
        .returning({
            id: usersTable.id,
            firstname: usersTable.firstname,
            lastname: usersTable.lastname,
            email: usersTable.email,
            picture: usersTable.picture,
        });

    return user;
};

// Link an existing email/password account with a Google account,
// so the user can keep logging in with both methods.
export const linkUserGoogle = async ({ userId, googleId, picture }) => {
    const [user] = await db
        .update(usersTable)
        .set({ googleId, picture })
        .where(eq(usersTable.id, userId))
        .returning({
            id: usersTable.id,
            firstname: usersTable.firstname,
            lastname: usersTable.lastname,
            email: usersTable.email,
            picture: usersTable.picture,
        });

    return user;
};

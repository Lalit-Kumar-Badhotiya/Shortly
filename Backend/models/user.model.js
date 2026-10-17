import { pgTable, text , timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users',{
    id: uuid().primaryKey().defaultRandom(),

    firstname: varchar({ length: 55 }).notNull(),
    lastname: varchar({ length: 55 }),

    email: varchar({ length: 255 }).notNull().unique(),

    // Null for users who sign up with Google instead of a password
    password: text(),
    salt: text(),

    // Google account id & avatar, populated for Google sign-in / linked accounts
    googleId: varchar('google_id', { length: 255 }).unique(),
    picture: text(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(()=> new Date()),
});
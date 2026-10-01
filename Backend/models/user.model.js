import { pgTable, text , timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users',{
    id: uuid().primaryKey().defaultRandom(),

    firstname: varchar({ length: 55 }).notNull(),
    lastname: varchar({ length: 55 }),

    email: varchar({ length: 255 }).notNull().unique(),

    password: text().notNull(),
    salt: text().notNull(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(()=> new Date()),
});
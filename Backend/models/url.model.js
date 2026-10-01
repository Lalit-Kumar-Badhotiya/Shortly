import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { usersTable } from './user.model.js'

export const urlsTable = pgTable('urls',{
    id: uuid().primaryKey().defaultRandom(),

    shortCode: varchar("short_code" , {  length: 155 }).notNull().unique(),
    target: text().notNull(),

    userId: uuid()
        .references(()=> usersTable.id)
        .notNull(),

    createdAt: timestamp().defaultNow().notNull(),
})
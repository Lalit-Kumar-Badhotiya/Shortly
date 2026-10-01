import { eq } from 'drizzle-orm';
import db from '../db/index';
import { urlsTable } from '../models/index'

export const createShortUrl = async (payload) => {
    const [result] = await db 
        .insert(urlsTable)
        .values({
            shortCode: payload.shortCode,
            target: payload.target,
            userId: payload.userId,
        })
        .returning({
            id: urlsTable.id,
            shortCode: urlsTable.shortCode,
            target: urlsTable.target,
        });

    return result;
};

export const getUrlById = async (id) => {
    const[result] = await db
        .select({ id: urlsTable.id, userId: urlsTable.userId})
        .from(urlsTable)
        .where(eq(urlsTable.id,id));

    return result;
}
import { nanoid } from 'nanoid'
import { shortenPostRequestBodySchema } from '../validations/request.validation.js'
import { createShortUrl, getUrlById } from '../services/url.service.js'
import db from '../db/index.js'
import { urlsTable } from '../models/url.model.js'
import { and, eq } from 'drizzle-orm'

export const shortenUrl = async (req,res) => {
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
        req.body
    );
    if(validationResult.error){
        return res.status(400).json({error: validationResult.error.message})
    }

    const {url , code } = validationResult.data;

    const shortCode = code ?? nanoid(6);

    const payload = {
        shortCode,
        target: url,
        userId: req.user.id,
    };

    const result = await createShortUrl(payload);

    return res.status(201).json({
        success: 'True',
        id: result.id,
        shortCode: result.shortCode,
        target: result.target,
    });
};

export const shortCode = async (req , res ) => {
    const { shortCode } = req.params;

    const [result] = await db
        .select({
            target: urlsTable.target,
        })
        .from(urlsTable)
        .where(eq(urlsTable.shortCode,shortCode));
    if(!result){
        return res.status(404).json({
            error: "URL for this short code not found"
        });
    }
}
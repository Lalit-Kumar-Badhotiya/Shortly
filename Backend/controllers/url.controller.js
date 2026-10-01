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
    res.redirect(result.target);
}

export const getAllCodes = async (req,res) =>{
    const userId = req.user.id;

    console.log("req.user is getAllCodes",userId);

    const codes = await db
        .select()
        .from(urlsTable)
        .where(eq(urlsTable.userId, userId));
    console.log('coded found by id',codes);

    return res.status(200).json({ codes });
};

export const deleteUrl = async (req,res)=>{
    const id = req.params.id;

    const userId = req.user.id;

    console.log("url delete id ",id);
    console.log("req.user in delete route",userId);

    await db
        .delete(urlsTable)
        .where(and(eq(urlsTable.id,id),eq(urlsTable.userId,req.user.id)));
    return res.status(200).json({ deleted: true });
};

export const updateUrl = async (req,res) => {
    const { shortCode, target } = req.body;
    console.log("req body of updateurl", shortCode);
    
    const id = req.params.id;

    const userId = req.user.id;

    if(!shortCode && !target){
        return res
            .status(404)
            .json({error: "Short code or target is required for updation"});
    }

    const existingUrl = await getUrlById(id);

    if(!existingUrl){
        return res
            .status(404)
            .json({ error: "The url you are trying to update does not exist" })
    }

    if(existingUrl.userId !== userId){
        return res.status(403).json({
            error: "You are not allowed to update this URL",
        });
    }

    const [updated] = await db
        .update(urlsTable)
        .set({shortCode,target})
        .where(and(eq(urlsTable.userId,userId), eq(urlsTable.id,id)))
        .returning({
            id: urlsTable.id,
            shortCode: urlsTable.shortCode,
            target: urlsTable.target,
        });
    if(!updated){
        return res.status(400).json({
            error: "Update failed",
        });
    }

    return res.status(200).json({
        updated: true,
        date: updated

    });
};

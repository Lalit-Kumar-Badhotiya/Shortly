import express from 'express'
import { deleteUrl, getAllCodes, shortCode, shortenUrl, updateUrl } from '../controllers/url.controller'
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/shorten', ensureAuthenticated , shortenUrl);
router.get('/codes', ensureAuthenticated, getAllCodes);

router.get('/:shortCode',shortCode);
router.delete('/:id', ensureAuthenticated, deleteUrl);

router.put('/:id', updateUrl);

export default router;

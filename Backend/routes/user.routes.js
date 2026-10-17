import express from 'express'
import { login, signup, authWithGoogle } from '../controllers/user.controller.js'

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/auth/google',authWithGoogle);

export default router;

import express from 'express';
import { registerCard, validateCard } from '../controllers/cardController.js';

const router = express.Router();

router.post('/register-card', registerCard);

router.post('/validate-card', validateCard);

export default router;

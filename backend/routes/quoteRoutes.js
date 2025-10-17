import express from 'express';
import { submitQuote } from '../controllers/quoteController.js';
import { upload } from '../middlewares/upload.js';
import { validateQuote } from '../middlewares/validation.js';

const router = express.Router();

router.post('/', upload.single('attachment'), validateQuote, submitQuote);

export default router;

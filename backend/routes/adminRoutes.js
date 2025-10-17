import express from 'express';
import { login, getProfile } from '../controllers/adminController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;

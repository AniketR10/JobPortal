import express, { Router } from 'express';
import { register, login, getMyInfo } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.get('/me', protect, getMyInfo);

export default route;
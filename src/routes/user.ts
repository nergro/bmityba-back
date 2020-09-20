import express, { Router } from 'express';

import { clientController as controller } from '../controllers';
import { isAdmin, isAuth } from '../middleware';
import { check } from 'express-validator';

export const router: Router = express.Router();

router.post(
    '/login',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    controller.login
);

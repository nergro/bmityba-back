import express, { Router } from 'express';

import { clientController as controller } from '../controllers';
import { check } from 'express-validator';

export const router: Router = express.Router();

router.post(
    '/register',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    controller.register
);

router.post(
    '/login',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    controller.login
);

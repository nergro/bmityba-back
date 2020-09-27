import express, { Router } from 'express';

import { mailController as controller } from '../controllers';
import { check } from 'express-validator';

export const router: Router = express.Router();

router.post(
    '/',
    check('name', 'name is required').exists(),
    check('email', 'email is required').exists(),
    check('message', 'message is required').exists(),
    controller.sendMail
);

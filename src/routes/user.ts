import express, { Router } from 'express';

import { clientController as controller } from '../controllers';
import { check } from 'express-validator';
import { isAuth } from '../middleware';

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

router.get('/verify', isAuth, controller.getByToken);

router.get('/:id', isAuth, controller.getOne);

router.put(
    '/edit',
    isAuth,
    check('password', 'Password is required').not().isEmpty(),
    controller.edit
);

router.delete('/:id', isAuth, controller.deleteOne);

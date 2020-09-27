import express, { Router } from 'express';

import { contactsController as controller } from '../controllers';
import { check } from 'express-validator';
import { isAuth } from '../middleware';

export const router: Router = express.Router();

router.post(
    '/',
    check('phone', 'phone is required').exists(),
    check('email', 'email is required').exists(),
    check('locationLT', 'locationLT is required').exists(),
    check('locationEN', 'locationEN is required').exists(),
    isAuth,
    controller.create
);

router.put(
    '/:id',
    check('phone', 'phone is required').exists(),
    check('email', 'email is required').exists(),
    check('locationLT', 'locationLT is required').exists(),
    check('locationEN', 'locationEN is required').exists(),
    isAuth,
    controller.edit
);

router.get('/all', controller.getAll);

router.get('/', isAuth, controller.getList);

router.get('/:id', isAuth, controller.getOne);

router.delete('/:id', isAuth, controller.deleteOne);

router.delete('/', isAuth, controller.deleteMany);

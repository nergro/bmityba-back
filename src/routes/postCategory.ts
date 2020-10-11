import express, { Router } from 'express';

import { postCategoryController as controller } from '../controllers';
import { check } from 'express-validator';
import { isAuth } from '../middleware';

export const router: Router = express.Router();

router.post(
    '/',
    check('nameLT', 'nameLT is required').exists(),
    check('nameEN', 'nameEN is required').exists(),
    isAuth,
    controller.create
);

router.put(
    '/:id',
    check('nameLT', 'nameLT is required').exists(),
    check('nameEN', 'nameEN is required').exists(),
    isAuth,
    controller.edit
);

router.get('/all', controller.getAll);

router.get('/', isAuth, controller.getList);

router.get('/:id', isAuth, controller.getOne);

router.delete('/:id', isAuth, controller.deleteOne);

router.delete('/', isAuth, controller.deleteMany);

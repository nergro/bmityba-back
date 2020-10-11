import express, { Router } from 'express';

import { postController as controller } from '../controllers';
import { check } from 'express-validator';
import { isAuth } from '../middleware';

export const router: Router = express.Router();

router.post(
    '/',
    check('category', 'category is required').exists(),
    check('title', 'title is required').exists(),
    check('date', 'date is required').exists(),
    check('content', 'content is required').exists(),
    check('image', 'Image is required').exists(),
    isAuth,
    controller.create
);

router.put(
    '/:id',
    check('category', 'category is required').exists(),
    check('title', 'title is required').exists(),
    check('date', 'date is required').exists(),
    check('content', 'content is required').exists(),
    check('image', 'Image is required').exists(),
    isAuth,
    controller.edit
);

router.get('/all', controller.getAll);

router.get('/', isAuth, controller.getList);

router.get('/:id', isAuth, controller.getOne);

router.delete('/:id', isAuth, controller.deleteOne);

router.delete('/', isAuth, controller.deleteMany);

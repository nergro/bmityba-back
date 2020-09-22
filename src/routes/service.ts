import express, { Router } from 'express';

import { serviceController as controller } from '../controllers';
import { check } from 'express-validator';
import { isAuth } from '../middleware';

export const router: Router = express.Router();

router.post(
    '/',
    check('nameLT', 'LT Name is required').exists(),
    check('nameEN', 'EN Name is required').exists(),
    check('descriptionLT', 'LT Description is required').exists(),
    check('descriptionEN', 'EN Description is required').exists(),
    check('benefits', 'Benefits is required').exists(),
    check('price', 'Price is required').exists(),
    check('priceDescriptionLT', 'PriceDescriptionLT is required').exists(),
    check('priceDescriptionEN', 'PriceDescriptionEN is required').exists(),
    check('image', 'Image is required').exists(),
    isAuth,
    controller.create
);

router.put(
    '/:id',
    check('nameLT', 'LT Name is required').exists(),
    check('nameEN', 'EN Name is required').exists(),
    check('descriptionLT', 'LT Description is required').exists(),
    check('descriptionEN', 'EN Description is required').exists(),
    check('benefits', 'Benefits is required').exists(),
    check('price', 'Price is required').exists(),
    check('priceDescriptionLT', 'PriceDescriptionLT is required').exists(),
    check('priceDescriptionEN', 'PriceDescriptionEN is required').exists(),
    check('image', 'Image is required').exists(),
    isAuth,
    controller.edit
);

router.get('/', controller.getList);

router.get('/all', controller.getAll);

router.get('/:id', controller.getOne);

router.delete('/:id', isAuth, controller.deleteOne);

router.delete('/', isAuth, controller.deleteMany);

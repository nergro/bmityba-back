import express, { Router } from 'express';

import { serviceController as controller } from '../controllers';
import { check } from 'express-validator';
import { isAuth } from '../middleware';

export const router: Router = express.Router();

router.post(
    '/',
    check('image', 'Image is required').exists(),
    check('nameLT', 'LT Name is required').exists(),
    check('nameEN', 'EN Name is required').exists(),
    check('descriptionLT', 'LT Description is required').exists(),
    check('descriptionEN', 'EN Description is required').exists(),
    check('price', 'Price is required').exists(),
    check('priceDescriptionLT', 'LT Price description is required').exists(),
    check('priceDescriptionEN', 'EN Price description is required').exists(),

    check('benefitsTitleLT', 'LT benefits title is required').exists(),
    check('benefitsTitleEN', 'EN benefits title is required').exists(),
    check(
        'benefitsDescriptionLT',
        'LT benefits description is required'
    ).exists(),
    check(
        'benefitsDescriptionEN',
        'EN benefits description is required'
    ).exists(),

    isAuth,
    controller.create
);

router.put(
    '/:id',
    check('image', 'Image is required').exists(),
    check('nameLT', 'LT Name is required').exists(),
    check('nameEN', 'EN Name is required').exists(),
    check('descriptionLT', 'LT Description is required').exists(),
    check('descriptionEN', 'EN Description is required').exists(),
    check('price', 'Price is required').exists(),
    check('priceDescriptionLT', 'LT Price description is required').exists(),
    check('priceDescriptionEN', 'EN Price description is required').exists(),

    check('benefitsTitleLT', 'LT benefits title is required').exists(),
    check('benefitsTitleEN', 'EN benefits title is required').exists(),
    check(
        'benefitsDescriptionLT',
        'LT benefits description is required'
    ).exists(),
    check(
        'benefitsDescriptionEN',
        'EN benefits description is required'
    ).exists(),
    isAuth,
    controller.edit
);

router.get('/', controller.getList);

router.get('/all', controller.getAll);

router.get('/:id', controller.getOne);

router.delete('/:id', isAuth, controller.deleteOne);

router.delete('/', isAuth, controller.deleteMany);

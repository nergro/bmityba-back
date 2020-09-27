import { Request, Response } from 'express';
import { Contacts } from '../models/contacts';
import { Contacts as ContactsInfo } from '../types/contacts';
import { QueryParams } from '../types/queryParams';
import { validationResult } from 'express-validator';

export const create = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { phone, email, locationLT, locationEN } = req.body as ContactsInfo;
    try {
        const data = new Contacts({
            phone,
            email,
            locationLT,
            locationEN
        });
        await data.save();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const edit = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { phone, email, locationLT, locationEN } = req.body as ContactsInfo;
    const { id } = req.params;
    try {
        const data = await Contacts.findById(id);
        if (data) {
            const update = {
                phone,
                email,
                locationLT,
                locationEN
            };
            await Contacts.findByIdAndUpdate(id, update);
            res.status(200).send({ msg: 'Contacts updated' });
        } else {
            res.status(404).json({ msg: 'Contacts not found' });
        }
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await Contacts.findById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getList = async (req: Request, res: Response) => {
    try {
        const { order, page, perPage, sort } = req.query as QueryParams;

        let skip = 0;
        if (page && perPage) {
            skip = parseInt(page) * parseInt(perPage) - parseInt(perPage);
        }

        const total = await Contacts.find();

        const data = await Contacts.find()
            .skip(skip)
            .limit(parseInt(perPage))
            .sort({ [sort]: order });

        res.status(200).json({ items: data, total: total.length });
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const data = await Contacts.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await Contacts.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteMany = async (req: Request, res: Response) => {
    const { ids } = req.body;
    try {
        const data = await Promise.all(
            ids.map((id: number) => Contacts.findByIdAndDelete(id))
        );

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

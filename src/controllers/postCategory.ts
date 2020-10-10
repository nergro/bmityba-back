import { Request, Response } from 'express';
import { PostCategory } from '../models/postCategory';
import { PostCategory as PostCategoryInfo } from '../types/postCategory';
import { QueryParams } from '../types/queryParams';
import { validationResult } from 'express-validator';

export const create = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { nameEN, nameLT } = req.body as PostCategoryInfo;
    try {
        const data = new PostCategory({
            nameEN,
            nameLT
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
    const { nameEN, nameLT } = req.body as PostCategoryInfo;
    const { id } = req.params;
    try {
        const data = await PostCategory.findById(id);
        if (data) {
            const update = {
                nameEN,
                nameLT
            };
            await PostCategory.findByIdAndUpdate(id, update);
            res.status(200).send({ msg: 'PostCategory updated' });
        } else {
            res.status(404).json({ msg: 'PostCategory not found' });
        }
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await PostCategory.findById(id);
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

        const total = await PostCategory.find();

        const data = await PostCategory.find()
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
        const data = await PostCategory.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await PostCategory.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteMany = async (req: Request, res: Response) => {
    const { ids } = req.body;
    try {
        const data = await Promise.all(
            ids.map((id: number) => PostCategory.findByIdAndDelete(id))
        );

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

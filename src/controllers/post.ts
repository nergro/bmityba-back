import { Request, Response } from 'express';
import { Post } from '../models/post';
import { Post as PostInfo } from '../types/post';
import { QueryParams } from '../types/queryParams';
import { validationResult } from 'express-validator';

export const create = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, category, date, content } = req.body as PostInfo;
    try {
        const data = new Post({
            title,
            category,
            date,
            content
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
    const { title, category, date, content } = req.body as PostInfo;
    const { id } = req.params;
    try {
        const data = await Post.findById(id);
        if (data) {
            const update = {
                title,
                category,
                date,
                content
            };
            await Post.findByIdAndUpdate(id, update);
            res.status(200).send({ msg: 'Post updated' });
        } else {
            res.status(404).json({ msg: 'Post not found' });
        }
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await Post.findById(id);
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

        const total = await Post.find();

        const data = await Post.find()
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
        const data = await Post.find();

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await Post.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteMany = async (req: Request, res: Response) => {
    const { ids } = req.body;
    try {
        const data = await Promise.all(
            ids.map((id: number) => Post.findByIdAndDelete(id))
        );

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

import { Request, Response } from 'express';
import { Post } from '../models/post';
import { Post as PostInfo } from '../types/post';
import { QueryParams } from '../types/queryParams';
import { validationResult } from 'express-validator';
import { Image } from '../models/image';
import { removeImage } from '../services/removeImage';

export const create = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        titleLT,
        titleEN,
        shortDescriptionLT,
        shortDescriptionEN,
        category,
        date,
        contentLT,
        contentEN,
        image
    } = req.body as PostInfo;

    const imageModel = await new Image({
        imageUrl: image.imageUrl,
        imageId: image.imageId
    }).save();

    try {
        const data = new Post({
            titleLT,
            titleEN,
            shortDescriptionLT,
            shortDescriptionEN,
            category,
            date,
            contentLT,
            contentEN,
            image: imageModel
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
    const {
        titleLT,
        titleEN,
        shortDescriptionLT,
        shortDescriptionEN,
        category,
        date,
        contentLT,
        contentEN,
        image
    } = req.body as PostInfo;
    const { id } = req.params;
    try {
        const data = await Post.findById(id);
        if (data) {
            await Image.findByIdAndDelete(data.image);

            const imageModel = await new Image({
                imageUrl: image.imageUrl,
                imageId: image.imageId
            }).save();

            const update = {
                titleLT,
                titleEN,
                shortDescriptionLT,
                shortDescriptionEN,
                category,
                date,
                contentLT,
                contentEN,
                image: imageModel
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

        const img = data && (await Image.findById(data.image));

        if (data) {
            res.status(200).json({
                category: data.category,
                titleLT: data.titleLT,
                titleEN: data.titleEN,
                shortDescriptionLT: data.shortDescriptionLT,
                shortDescriptionEN: data.shortDescriptionEN,
                date: data.date,
                contentLT: data.contentLT,
                contentEN: data.contentEN,
                image: {
                    imageUrl: img ? img.imageUrl : '',
                    imageId: img ? img.imageId : ''
                }
            });
        } else {
            res.status(404).json({ msg: 'Post not found' });
        }
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
            .populate('image')
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
        const data = await Post.find().populate('image').populate('category');

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const data = await Post.findByIdAndDelete(id);

        if (data) {
            const deletedOldImage = await Image.findByIdAndDelete(data.image);
            deletedOldImage && removeImage(deletedOldImage.imageId);

            res.status(200).json(data);
        } else {
            res.status(404).json({ msg: 'Post not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteMany = async (req: Request, res: Response) => {
    const { ids } = req.body;
    try {
        const data: PostInfo[] = await Promise.all(
            ids.map((id: number) => Post.findByIdAndDelete(id))
        );

        data.forEach(async (item) => {
            if (item) {
                const deletedOldImage = await Image.findByIdAndDelete(
                    item.image
                );
                deletedOldImage && removeImage(deletedOldImage.imageId);
            }
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

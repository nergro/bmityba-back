import { Request, Response } from 'express';
import { Service } from '../models/service';
import { Image } from '../models/image';
import { Service as ServiceInfo } from '../types/service';
import { validationResult } from 'express-validator';
import { QueryParams } from '../types/queryParams';
import cloudinary from 'cloudinary';

export const create = async (req: Request, res: Response) => {
    const body = req.body as ServiceInfo;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const imageModel = await new Image({
            imageUrl: body.image.imageUrl,
            imageId: body.image.imageId
        }).save();

        const service = new Service({
            ...body,
            image: imageModel,
            benefits: body.benefits
        });
        await service.save();
        res.status(200).json(service);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Bad request' });
    }
};

export const edit = async (req: Request, res: Response) => {
    const body = req.body as ServiceInfo;

    const { id } = req.params;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const service = await Service.findById(id);
        if (service) {
            await Image.findByIdAndDelete(service.image);

            const imageModel = await new Image({
                imageUrl: body.image.imageUrl,
                imageId: body.image.imageId
            }).save();

            const update = {
                ...body,
                image: imageModel,
                benefits: body.benefits
            };

            await Service.findByIdAndUpdate(id, update);
            res.status(200).send({ msg: 'Service updated' });
        } else {
            res.status(404).json({ msg: 'Service not found' });
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

        const totalServices = await Service.find();

        const services = await Service.find()
            .populate('image')
            .skip(skip)
            .limit(parseInt(perPage))
            .sort({ [sort]: order });

        res.status(200).json({ items: services, total: totalServices.length });
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const services = await Service.find()
            .populate('image')
            .populate('benefits');

        res.status(200).json(services);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id);

        const img = service && (await Image.findById(service.image));

        if (service) {
            res.status(200).json({
                image: {
                    imageUrl: img ? img.imageUrl : '',
                    imageId: img ? img.imageId : ''
                },
                nameLT: service.nameLT,
                nameEN: service.nameEN,
                labelLT: service.labelLT,
                labelEN: service.labelEN,
                shortDescriptionLT: service.shortDescriptionLT,
                shortDescriptionEN: service.shortDescriptionEN,
                descriptionLT: service.descriptionLT,
                descriptionEN: service.descriptionEN,
                price: service.price,
                priceDescriptionLT: service.priceDescriptionLT,
                priceDescriptionEN: service.priceDescriptionEN,
                benefitsTitleLT: service.benefitsTitleLT,
                benefitsTitleEN: service.benefitsTitleEN,
                benefitsDescriptionLT: service.benefitsDescriptionLT,
                benefitsDescriptionEN: service.benefitsDescriptionEN,
                benefits: service.benefits
            });
        } else {
            res.status(404).json({ msg: 'Service not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const service = await Service.findByIdAndDelete(id);

        if (service) {
            const deletedOldImage = await Image.findByIdAndDelete(
                service.image
            );
            deletedOldImage && removeImage(deletedOldImage.imageId);

            res.status(200).json(service);
        } else {
            res.status(404).json({ msg: 'Service not found' });
        }
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteMany = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        const services: ServiceInfo[] | null = await Promise.all(
            ids.map((id: number) => Service.findByIdAndDelete(id))
        );

        services.forEach(async (service) => {
            if (service) {
                const deletedOldImage = await Image.findByIdAndDelete(
                    service.image
                );
                deletedOldImage && removeImage(deletedOldImage.imageId);
            }
        });

        res.status(200).json(services);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

const removeImage = (removableImageId: string) => {
    cloudinary.v2.uploader.destroy(removableImageId);
};

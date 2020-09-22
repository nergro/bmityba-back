import { Document } from 'mongoose';
import { ImageType } from './image';

export interface Service extends Document {
    id: string;
    nameLT: string;
    nameEN: string;
    descriptionLT: string;
    descriptionEN: string;
    benefits: {
        titleLT: string;
        titleEN: string;
        descriptionLT: string;
        descriptionEN: string;
        benefits: string[];
    };
    price: number;
    priceDescriptionLT: string;
    priceDescriptionEN: string;
    image: ImageType;
}

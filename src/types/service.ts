import { Document } from 'mongoose';
import { ImageType } from './image';

export interface Service extends Document {
    id: string;
    image: ImageType;
    nameLT: string;
    nameEN: string;
    labelLT?: string;
    labelEN?: string;
    shortDescriptionLT: string;
    shortDescriptionEN: string;
    descriptionLT: string;
    descriptionEN: string;
    price: number;
    priceDescriptionLT: string;
    priceDescriptionEN: string;
    benefitsTitleLT: string;
    benefitsTitleEN: string;
    benefitsDescriptionLT: string;
    benefitsDescriptionEN: string;
    benefits: string[];
}

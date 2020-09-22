import { Document } from 'mongoose';
import { ImageType } from './image';

export interface Service extends Document {
    id: string;
    image: ImageType;
    nameLT: string;
    nameEN: string;
    descriptionLT: string;
    descriptionEN: string;
    price: number;
    priceDescriptionLT: string;
    priceDescriptionEN: string;

    benefitsTitleLT: string;
    benefitsTitleEN: string;
    benefitsDescriptionLT: string;
    benefitsDescriptionEN: string;
    benefits: {
        benefit1NameLT?: string;
        benefit1NameEN?: string;
        benefit1DescriptionLT?: string;
        benefit1DescriptionEN?: string;
        benefit2NameLT?: string;
        benefit2NameEN?: string;
        benefit2DescriptionLT?: string;
        benefit2DescriptionEN?: string;
        benefit3NameLT?: string;
        benefit3NameEN?: string;
        benefit3DescriptionLT?: string;
        benefit3DescriptionEN?: string;
        benefit4NameLT?: string;
        benefit4NameEN?: string;
        benefit4DescriptionLT?: string;
        benefit4DescriptionEN?: string;
    };
}

import mongoose from 'mongoose';
import { Service as ServiceInfo } from '../types/service';

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    nameLT: {
        type: String,
        required: true
    },
    nameEN: {
        type: String,
        required: true
    },
    labelLT: {
        type: String
    },
    labelEN: {
        type: String
    },
    shortDescriptionLT: {
        type: String,
        required: true
    },
    shortDescriptionEN: {
        type: String,
        required: true
    },
    descriptionLT: {
        type: String,
        required: true
    },
    descriptionEN: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceDescriptionLT: {
        type: String,
        required: true
    },
    priceDescriptionEN: {
        type: String,
        required: true
    },

    benefitsTitleLT: {
        type: String,
        required: true
    },
    benefitsTitleEN: {
        type: String,
        required: true
    },
    benefitsDescriptionLT: {
        type: String,
        required: true
    },
    benefitsDescriptionEN: {
        type: String,
        required: true
    },
    benefits: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Benefit'
        }
    ]
});

ServiceSchema.set('toJSON', {
    virtuals: true
});

export const Service = mongoose.model<ServiceInfo>('Service', ServiceSchema);

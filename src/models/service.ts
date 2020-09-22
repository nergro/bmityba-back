import mongoose from 'mongoose';
import { Service as ServiceInfo } from '../types/service';

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    nameLT: {
        type: String,
        required: true
    },
    nameEN: {
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
    benefits: {
        titleLT: {
            type: String,
            required: true
        },
        titleEN: {
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
        benefits: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Benefit'
            }
        ]
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
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }
});

ServiceSchema.set('toJSON', {
    virtuals: true
});

export const Service = mongoose.model<ServiceInfo>('Service', ServiceSchema);

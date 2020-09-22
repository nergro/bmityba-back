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
    benefits: {
        benefit1NameLT: {
            type: String
        },
        benefit1NameEN: {
            type: String
        },
        benefit1DescriptionLT: {
            type: String
        },
        benefit1DescriptionEN: {
            type: String
        },
        benefit2NameLT: {
            type: String
        },
        benefit2NameEN: {
            type: String
        },
        benefit2DescriptionLT: {
            type: String
        },
        benefit2DescriptionEN: {
            type: String
        },
        benefit3NameLT: {
            type: String
        },
        benefit3NameEN: {
            type: String
        },
        benefit3DescriptionLT: {
            type: String
        },
        benefit3DescriptionEN: {
            type: String
        },
        benefit4NameLT: {
            type: String
        },
        benefit4NameEN: {
            type: String
        },
        benefit4DescriptionLT: {
            type: String
        },
        benefit4DescriptionEN: {
            type: String
        }
    }
});

ServiceSchema.set('toJSON', {
    virtuals: true
});

export const Service = mongoose.model<ServiceInfo>('Service', ServiceSchema);

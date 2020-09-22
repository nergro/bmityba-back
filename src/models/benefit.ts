import mongoose from 'mongoose';
import { Benefit as BenefitInfo } from '../types/benefit';

const Schema = mongoose.Schema;

const BenefitSchema = new Schema({
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
    }
});

BenefitSchema.set('toJSON', {
    virtuals: true
});

export const Benefit = mongoose.model<BenefitInfo>('Benefit', BenefitSchema);

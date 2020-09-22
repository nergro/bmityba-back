import { Document } from 'mongoose';

export interface Benefit extends Document {
    nameLT: string;
    nameEN: string;
    descriptionLT: string;
    descriptionEN: string;
}

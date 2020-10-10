import { Document } from 'mongoose';

export interface PostCategory extends Document {
    nameLT: string;
    nameEN: string;
}

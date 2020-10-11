import { Document } from 'mongoose';
import { ImageType } from './image';

export interface Post extends Document {
    id: string;
    category: string;
    image: ImageType;
    titleLT: string;
    titleEN: string;
    date: string;
    contentLT: string;
    contentEN: string;
}

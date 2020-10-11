import { Document } from 'mongoose';
import { ImageType } from './image';

export interface Post extends Document {
    id: string;
    category: string;
    image: ImageType;
    title: string;
    date: string;
    content: string;
}

import { Document } from 'mongoose';

export interface Post extends Document {
    id: string;
    category: string;
    title: string;
    date: string;
    content: string;
}

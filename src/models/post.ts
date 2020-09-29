import mongoose from 'mongoose';
import { Post as PostInfo } from '../types/post';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

PostSchema.set('toJSON', {
    virtuals: true
});

export const Post = mongoose.model<PostInfo>('Post', PostSchema);

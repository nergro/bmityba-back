import mongoose from 'mongoose';
import { Post as PostInfo } from '../types/post';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'PostCategory'
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
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }
});

PostSchema.set('toJSON', {
    virtuals: true
});

export const Post = mongoose.model<PostInfo>('Post', PostSchema);

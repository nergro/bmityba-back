import mongoose from 'mongoose';
import { Post as PostInfo } from '../types/post';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'PostCategory'
    },
    titleLT: {
        type: String,
        required: true
    },
    titleEN: {
        type: String,
        required: true
    },
    shortDescriptionLT: {
        type: String,
        required: true
    },
    shortDescriptionEN: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    contentLT: {
        type: String,
        required: true
    },
    contentEN: {
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

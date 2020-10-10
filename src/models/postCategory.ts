import mongoose from 'mongoose';
import { PostCategory as PostCategoryInfo } from '../types/postCategory';

const Schema = mongoose.Schema;

const PostCategorySchema = new Schema({
    nameLT: {
        type: String,
        required: true
    },
    nameEN: {
        type: String,
        required: true
    }
});

PostCategorySchema.set('toJSON', {
    virtuals: true
});

export const PostCategory = mongoose.model<PostCategoryInfo>(
    'PostCategory',
    PostCategorySchema
);

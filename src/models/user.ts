import mongoose from 'mongoose';
import { UserInterface } from '../types/user';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.set('toJSON', {
    virtuals: true
});

export const User = mongoose.model<UserInterface>('User', UserSchema);

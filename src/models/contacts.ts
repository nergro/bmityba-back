import mongoose from 'mongoose';
import { Contacts as ContactsInfo } from '../types/contacts';

const Schema = mongoose.Schema;

const ContactsSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    locationLT: {
        type: String,
        required: true
    },
    locationEN: {
        type: String,
        required: true
    }
});

ContactsSchema.set('toJSON', {
    virtuals: true
});

export const Contacts = mongoose.model<ContactsInfo>(
    'Contacts',
    ContactsSchema
);

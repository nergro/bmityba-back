import { Document } from 'mongoose';

export interface Contacts extends Document {
    id: string;
    phone: string;
    email: string;
    locationLT: string;
    locationEN: string;
}

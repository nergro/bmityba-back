import { Document } from 'mongoose';

export interface Question extends Document {
    id: string;
    questionLT: string;
    questionEN: string;
    answerLT: string;
    answerEN: string;
}

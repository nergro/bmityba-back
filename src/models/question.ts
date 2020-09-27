import mongoose from 'mongoose';
import { Question as QuestionInfo } from '../types/question';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    questionLT: {
        type: String,
        required: true
    },
    questionEN: {
        type: String,
        required: true
    },
    answerLT: {
        type: String,
        required: true
    },
    answerEN: {
        type: String,
        required: true
    }
});

QuestionSchema.set('toJSON', {
    virtuals: true
});

export const Question = mongoose.model<QuestionInfo>(
    'Question',
    QuestionSchema
);

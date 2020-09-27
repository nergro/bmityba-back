import { Request, Response } from 'express';
import { Question } from '../models/question';
import { Question as QuestionInfo } from '../types/question';
import { QueryParams } from '../types/queryParams';
import { validationResult } from 'express-validator';

export const create = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        questionLT,
        questionEN,
        answerLT,
        answerEN
    } = req.body as QuestionInfo;
    try {
        const question = new Question({
            questionLT,
            questionEN,
            answerLT,
            answerEN
        });
        await question.save();
        res.status(200).json(question);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const edit = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        questionLT,
        questionEN,
        answerLT,
        answerEN
    } = req.body as QuestionInfo;
    const { id } = req.params;
    try {
        const question = await Question.findById(id);
        if (question) {
            const update = {
                questionLT,
                questionEN,
                answerLT,
                answerEN
            };
            await Question.findByIdAndUpdate(id, update);
            res.status(200).send({ msg: 'Question updated' });
        } else {
            res.status(404).json({ msg: 'Question not found' });
        }
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getList = async (req: Request, res: Response) => {
    try {
        const { order, page, perPage, sort } = req.query as QueryParams;

        let skip = 0;
        if (page && perPage) {
            skip = parseInt(page) * parseInt(perPage) - parseInt(perPage);
        }

        const total = await Question.find();

        const questions = await Question.find()
            .skip(skip)
            .limit(parseInt(perPage))
            .sort({ [sort]: order });

        res.status(200).json({ items: questions, total: total.length });
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find();

        res.status(200).json(questions);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const question = await Question.findByIdAndDelete(id);
        res.status(200).json(question);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

export const deleteMany = async (req: Request, res: Response) => {
    const { ids } = req.body;
    try {
        const questions = await Promise.all(
            ids.map((id: number) => Question.findByIdAndDelete(id))
        );

        res.status(200).json(questions);
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

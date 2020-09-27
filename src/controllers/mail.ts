import { Request, Response } from 'express';
import { Mail } from '../types/mail';
import { validationResult } from 'express-validator';
import { sendRequestEmail } from '../services/mailer';

export const sendMail = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, message, subject } = req.body as Mail;
    try {
        sendRequestEmail(name, email, message, subject);
        res.status(200).json('Message sent');
    } catch (error) {
        res.status(400).send({ error: 'Bad request' });
    }
};

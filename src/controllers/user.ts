import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { UserJWTPayload } from '../types/user';
import jwt from 'jsonwebtoken';
import { getEnvironmentVariableString } from '../services/environmentVariable';
import { validationResult } from 'express-validator';

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(401)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const payload: UserJWTPayload = {
            id: user.id,
            userType: user.userType
        };

        jwt.sign(
            payload,
            getEnvironmentVariableString('JWT_SECRET'),
            { expiresIn: getEnvironmentVariableString('JWT_EXPIRETIME') },
            (err, token) => {
                if (err) throw err;
                res.json({
                    id: user.id,
                    name: user.name,
                    userType: user.userType,
                    token
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(400).send({ error: 'Bad request' });
    }
};

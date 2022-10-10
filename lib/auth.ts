import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const { MEESEEKS_ACCESS_TOKEN: token } = req.cookies;

        if (token) {
            let user;

            try {
                const { id } = jwt.verify(token, 'meeseeks') as JwtPayload;
                user = await prisma.user.findUnique({
                    where: { id }
                })

                if (!user) {
                    throw new Error('Invalid token');
                }
            } catch (error) {
                res.status(401);
                res.json({ error: 'Not authorized' });
                return;
            }

            return handler(req, res, user);
        }

        res.status(401);
        res.json({ error: 'Not authorized' });
    }
}
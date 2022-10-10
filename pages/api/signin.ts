import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from "../../lib/prisma";
import bcrypt from 'bcrypt';

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    let user;

    try {
        user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    } catch (e) {
        res.status(500);
        res.json({
            error: 'Server error'
        })
        return;
    }

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            time: Date.now()
        }, 'meeseeks',
            {
                expiresIn: '8h'
            });

        res.setHeader(
            'Set-Cookie',
            cookie.serialize('MEESEEKS_ACCESS_TOKEN', token, {
                httpOnly: true,
                maxAge: 8 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            })
        )
        delete user.password;
        res.json(user);
    } else {
        res.status(401);
        res.json({
            error: 'Invalid email or password'
        })
    }
}

export default signIn;
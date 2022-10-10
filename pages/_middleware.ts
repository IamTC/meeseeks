import { NextRequest, NextResponse } from "next/server";

const singedinPages = [
    '/',
    '/playlist',
    '/library'
];

export default function middleware(req: NextRequest) {
    if (singedinPages.find(p => p === req.nextUrl.pathname)) {
        const token = req.cookies.MEESEEKS_ACCESS_TOKEN;

        if (!token) {
            return NextResponse.redirect('/signin');
        }
    }
}
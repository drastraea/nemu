import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";

export async function middleware(req) {
    const session = await auth();

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-session", JSON.stringify(session || {}));

    return NextResponse.next({
        headers: requestHeaders,
    });
}

export const config = {
    matcher: "/:path*",
};

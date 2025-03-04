"use server";

import { cookies } from "next/headers";
import prisma from "@/libs/db";

export async function auth() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("sessionId")?.value;
        if (!sessionId) {
            return null;
        }

        const session = await prisma.session.findFirst({
            where: {
                id: sessionId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    }
                }
            }
        })

        if (!session) {
            return null;
        }

        return session;
    } catch (error) {
        console.error("Error authenticating user", error);
        return null;
    }
}
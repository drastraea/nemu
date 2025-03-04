"use server";

import { cookies } from "next/headers";
import prisma from "@/libs/db";

export async function auth() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("session_id");

        if (!sessionId) {
            return null;
        }

        const session = await prisma.session.findFirst({
            where: {
                session: sessionId,
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
    } catch (error) {
        console.error("Error authenticating user", error);
        return null;
    }
}
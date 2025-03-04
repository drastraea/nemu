"use server";

import { auth } from "@/libs/auth";
import prisma from "@/libs/db";
import { uploadImage } from "@/libs/file-store";

export async function createLostItem(_, formData) {
    const name = formData.get("name");
    const category = formData.get("category");
    const timeframe = new Date(formData.get("timeframe"));
    const location = formData.get("location");
    const file = formData.get("file");

    const session = await auth();

    if (!session) {
        return {
            success: false,
            message: "Please login to submit a lost item."
        };
    }

    if (!name || !category || !timeframe || !location) {
        return {
            success: false,
            message: "Please fill in all fields."
        };
    }

    const newLostItem = await prisma.item.create({
        data: {
            name,
            type: "LOST",
            category,
            timeframe,
            location,
            user: { connect: { id: session.user.id } }
        }
    });

    await prisma.image.create({
        data: {
            url: file.name,
            itemId: newLostItem.id
        }
    });

    await uploadImage({ key: file.name, folder: newLostItem.id, body: file })

    return {
        success: true,
        message: "Lost item submitted to be found."
    };
}
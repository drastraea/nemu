"use server";

import prisma from "@/libs/db";

export async function getNotificationsAction(userId) {
  try {
    const notification = await prisma.notification.findMany({
      where: { userId: userId, read: false },
    });
    return notification;
  } catch (error) {
    return [];
  }
}

export async function patchReadNotificationAction(notifId) {
  try {
    await prisma.notification.update({
      where: { id: notifId },
      data: { read: true },
    });
    return true;
  } catch (error) {
    console.error(`failed update notification [ERROR]: ${error}`);
    return false;
  }
}

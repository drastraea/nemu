"use server";

import prisma from "@/libs/db";
import { revalidatePath } from "next/cache";

export async function confirmFoundItem(_, formData) {
  const matchId = formData.get("matchId");
  const confirmation = formData.get("confirmation");

  if (!matchId) return false;

  const matchStatus = confirmation === "confirm" ? "CONFIRMED" : "REJECTED";

  const match = await prisma.match.update({
    where: { id: matchId },
    data: { status: matchStatus },
  });

  if (confirmation === "confirm") {
    Promise.all([
      await prisma.item.update({
        where: { id: match.lostItemId },
        data: { archiveAt: new Date() },
      }),
      await prisma.item.update({
        where: { id: match.foundItemId },
        data: { archiveAt: new Date() },
      }),
    ]);
  } else {
    const item = await prisma.item.findUnique({
      where: { id: match.lostItemId },
    });
    await prisma.item.update({
      where: { id: match.lostItemId },
      data: { rejectItemId: [...item.rejectItemId, match.foundItemId] },
    });
  }

  return true;
}

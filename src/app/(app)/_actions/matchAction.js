"use server";
import prisma from "@/libs/db";

export async function getMatchById(matchId) {
  const match = await prisma.match.findUnique({ where: { id: matchId } });

  return match;
}

export async function getMatchAndVerifyFoundItem(itemId) {
  const match = await prisma.match.findFirst({
    where: {
      lostItemId: itemId,
      status: "PENDING",
    },
    include: {
      foundItem: {
        select: {
          id: true,
          name: true,
          images: true,
          timeframe: true,
          location: true,
        },
      },
    },
  });

  if (match) return match;

  const matchFound = await prisma.match.findFirst({
    where: {
      lostItemId: itemId,
      status: "CONFIRMED",
    },
    include: {
      foundItem: {
        select: {
          id: true,
          name: true,
          images: true,
          timeframe: true,
          location: true,
          userId: true,
          user: true,
        },
      },
    },
  });

  return matchFound;
}

"use server";
import prisma from "@/libs/db";

export async function getMatchById(matchId) {
  const match = await prisma.match.findUnique({ where: { id: matchId } });

  return match;
}

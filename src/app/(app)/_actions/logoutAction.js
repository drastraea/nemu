"use server";

import prisma from "@/libs/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  cookieStore.delete("sessionId");
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });

  redirect("/login");
}

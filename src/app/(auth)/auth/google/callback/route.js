import prisma from "@/libs/db";
import { google } from "@/libs/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req) {
  const query = req.nextUrl.searchParams;
  const code = query.get("code");
  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value;

  const tokens = await google.validateAuthorizationCode(code, codeVerifier);

  const accessToken = tokens.accessToken();
  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  // create user
  if (!user) {
    const createUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });

    const newSession = await prisma.session.create({
      data: {
        userId: createUser.id,
      },
    });

    cookieStore.set("sessionId", newSession.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    });

    redirect("/");
  }

  // user already exists
  const newSession = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  cookieStore.set("sessionId", newSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
  });

  redirect("/");
}

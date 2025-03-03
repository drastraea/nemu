"use server";

import { cookies } from "next/headers";

import * as arctic from "arctic";
import { google } from "@/libs/google";
import { redirect } from "next/navigation";

export async function continueWithGoogle(_, formData) {
  const cookieStore = await cookies();
  const state = arctic.generateState();
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ["openid", "profile", "email"];

  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
  });

  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  redirect(url.href);
}

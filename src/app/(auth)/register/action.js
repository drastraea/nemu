"use server";

import prisma from "@/libs/db";
import bcrypt from "bcrypt";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return {
      status: "error",
      message: "All field is required",
    };
  }

  if (name.length < 3) {
    return {
      status: "error",
      message: "Fullname must be at least 3 characters long",
    };
  }

  if (password.length < 8) {
    return {
      status: "error",
      message: "Password must be at least 8 characters",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return {
      status: "error",
      message: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    status: "success",
    message: "Register is successfully. Please login",
  };
}

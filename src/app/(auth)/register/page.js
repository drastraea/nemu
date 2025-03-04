"use client";

import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { registerAction } from "./action";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  PersonIcon,
  UIEnvelope,
} from "@/components/ui/icons";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <main className="space-y-4">
      <section className="text-center space-y-2 pb-6">
        <h3 className="text-2xl font-bold">Create your account</h3>
        <p className="text-sm text-gray-500">
          Fill in the details below to get started
        </p>
      </section>
      <section>
        <form action={formAction} className="space-y-4">
          <Input
            className="pb-4"
            label="Full Name"
            labelPlacement="outside"
            name="name"
            placeholder="Full Name"
            variant="bordered"
            endContent={<PersonIcon />}
            radius="sm"
          />
          <Input
            className="pb-4"
            label="Email Address"
            labelPlacement="outside"
            name="email"
            type="email"
            placeholder="you@example.com"
            variant="bordered"
            radius="sm"
            endContent={<UIEnvelope />}
          />
          <Input
            label="Password"
            labelPlacement="outside"
            name="password"
            type={isVisible ? "text" : "password"}
            placeholder="Create a strong password"
            variant="bordered"
            radius="sm"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
              </button>
            }
          />
          <Button
            type="submit"
            isLoading={pending}
            color="primary"
            fullWidth
            className="font-semibold text-base "
            radius="sm"
          >
            Create Account
          </Button>
        </form>
      </section>
      {state?.status === "error" && (
        <div className="text-center text-rose-600 bg-rose-50 p-2 rounded-lg">
          {state.message}
        </div>
      )}
      {state?.status === "success" && (
        <div className="text-center text-emerald-600 bg-emerald-50 p-2 rounded-lg">
          {state.message}
        </div>
      )}
      <section className="flex gap-x-2 justify-center">
        <p className="text-gray-500">Already have an account?</p>
        <Link href="/login" className="text-blue-700  hover:underline">
          Login
        </Link>
      </section>
    </main>
  );
}

"use client";

import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { loginAction } from "./action";
import { OauthButton } from "../_components/oauthButton";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  UIEnvelope,
} from "@/components/ui/icons";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="space-y-4">
      <section className="text-center space-y-2 pb-6">
        <h3 className="text-2xl font-bold">Welcome back</h3>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your account
        </p>
      </section>
      <section>
        <form action={formAction} className="space-y-4 ">
          <Input
            label="Email Address"
            labelPlacement="outside"
            className="pb-4"
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
            placeholder="••••••••"
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
            className="font-semibold text-base"
            radius="sm"
          >
            Login
          </Button>
        </form>
      </section>
      <section className="flex items-center justify-center space-x-2">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="text-gray-500 text-sm">OR</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </section>
      <OauthButton />
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
        <p className="text-gray-500">Don&rsquo;t have an account?</p>
        <Link href="/register" className="text-blue-700  hover:underline">
          Register
        </Link>
      </section>
    </main>
  );
}

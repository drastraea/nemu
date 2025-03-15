import { AvatarMenu } from "./avatar-menu";
import { auth } from "@/libs/auth";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { NotificationBadge } from "./notification-badge";
import { getNotificationsAction } from "../_actions/notificationAction";
import Link from "next/link";

export const Nav = async () => {
  const session = await auth();

  let notifications = [];
  if (session) {
    notifications = await getNotificationsAction(session.userId);
  }

  return (
    <Navbar
      height={64}
      maxWidth="xl"
      className="bg-black border-white/10 border-b  "
    >
      <NavbarBrand>
        <Link href="/">
          <Image
            alt="nemu logo"
            src="/images/nemu-w.png"
            width={70}
            height={35}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/lost-item" className="text-white font-semibold">
            Lost Item
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/found-item" className="text-white font-semibold">
            Found Item
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session ? (
            <div className="flex flex-row items-center gap-6">
              <NotificationBadge notifications={notifications} />
              <AvatarMenu session={session} />
            </div>
          ) : (
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              className=" text-white font-semibold"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

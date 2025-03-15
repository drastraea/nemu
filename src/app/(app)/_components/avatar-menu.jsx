"use client";

import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@heroui/react";
import Avatar from "boring-avatars";
import Link from "next/link";
import { logoutAction } from "../_actions/logoutAction";
import {
  ListIcon,
  LogoutIcon,
} from "@/components/ui/icons";

const avatarColors = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"];

export const AvatarMenu = ({ session }) => {
  if (!session?.user) return null;

  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <div className="flex items-center justify-center w-8 h-8 rounded-full hover:cursor-pointer">
          <Avatar size={28} name={session.user.name} variant="beam" colors={avatarColors} />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Avatar Menu">
        <DropdownItem showDivider key="profile" as={Link} href="/my-items" className="h-14 gap-2">
          <div className="flex justify-center items-center space-x-2">
            <Avatar size={28} name={session.user.name} variant="beam" colors={avatarColors} />
            <div>
              <div>{session.user.name}</div>
              <div className="text-sm text-gray-500">{session.user.email}</div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem key="my-lost-item" as={Link} href="/my-items" startContent={<ListIcon />}>
          My Lost Item
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<LogoutIcon />}
          onPress={async () => {
            await logoutAction(); // Ensure logout is properly awaited if it's async
          }}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

"use client"

import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, User, Button } from "@heroui/react";
import Avatar from "boring-avatars";
import Link from "next/link";

export const AvatarMenu = ({userName}) => {
    const avatar = () => {
        return <Avatar size={36} name={userName} variant="beam" />;
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <div className="flex items-center justify-center w-8 h-8 rounded-full hover:cursor-pointer">
                    <div className="text-white font-semibold">{avatar()}</div>
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Avatar Menu">
                <DropdownItem key="user">
                    <div className="flex flex-row space-x-4 items-center">
                        <User avatarProps={{icon: avatar()}} name={userName}/>
                    </div>
                </DropdownItem>
                <DropdownItem key="my-lost-item">
                    <Button as={Link} href="/my-lost-item" variant="border" size="sm" className="ms-9">My Lost Item</Button>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
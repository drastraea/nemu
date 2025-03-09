'use client'

import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from '@heroui/react'
import Avatar from 'boring-avatars'
import Link from 'next/link'
import { logoutAction } from '../_actions/logoutAction'
import {
  ListIcon,
  LogoutIcon,
  SettingIcon,
  UserIcon,
} from '@/components/ui/icons'

export const AvatarMenu = ({ session }) => {
  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <div className="flex items-center justify-center w-8 h-8 rounded-full hover:cursor-pointer">
          <Avatar
            size={28}
            name={session.user.name}
            variant="beam"
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Avatar Menu">
        <DropdownItem
          showDivider
          key="profile"
          as={Link}
          href="/my-items"
          className="h-14 gap-2"
        >
          <div className="flex justify-center items-center space-x-2">
            <Avatar
              size={28}
              name={session.user.name}
              variant="beam"
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
            <div>
              <div>{session.user.name}</div>
              <div>{session.user.email}</div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem
          key="my-lost-item"
          as={Link}
          href="/my-items"
          startContent={<ListIcon />}
        >
          My Lost Item
        </DropdownItem>
        <DropdownItem
          key="setting"
          as={Link}
          href="/"
          startContent={<SettingIcon />}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<LogoutIcon />}
          onPress={() => {
            logoutAction()
          }}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

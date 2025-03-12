import { AvatarMenu } from './avatar-menu'
import { auth } from '@/libs/auth'
import Image from 'next/image'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@heroui/react'

export const Nav = async () => {
  const session = await auth()

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
            <AvatarMenu session={session} />
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
  )
}

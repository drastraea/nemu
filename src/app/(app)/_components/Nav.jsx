import { Button } from '@heroui/react'
import Link from 'next/link'
import { AvatarMenu } from './avatar-menu'
import { auth } from '@/libs/auth'

export const Nav = async () => {
  const session = await auth()

  return (
    <div className="bg-black text-white py-2 px-4 lg:mx-40 flex justify-between items-center rounded-b-lg">
      <Link className="font-mono tracking-wide cursor-pointer" href="/">
        NEMU
      </Link>
      <div className="flex space-x-4">
        <Link href="/lost-item" className="">
          Lost Item
        </Link>
        <Link href="/found-item" className="">
          Found Item
        </Link>
      </div>
      <div>
        {session ? (
          <AvatarMenu session={session} />
        ) : (
          <Button
            as={Link}
            href="/login"
            variant="border"
            radius="sm"
            className="bg-transparent border-2 border-gray-400 text-white font-semibold"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  )
}

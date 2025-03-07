import { Button } from "@heroui/react"
import Link from "next/link"
import { AvatarMenu } from "./avatar-menu"

export const Nav = ({auth}) => {
    const username = auth?.user.name

    return (
        <div className="bg-black text-white py-2 px-4 lg:mx-40 flex justify-between items-center rounded-b-lg">
            <Link className="" href="/">Nemu</Link>
            <div className="flex space-x-4">
                <Link href="/lost-item" className="">Lost Item</Link>
                <Link href="/found-item" className="">Found Item</Link>
            </div>
            <div>
                {username ? (<AvatarMenu userName={username}/>) : (<Button as={Link} href="/login" variant="border" size="sm">Login</Button>)}
            </div>
        </div>
    )
}
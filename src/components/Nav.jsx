import { Button } from "@heroui/react"
import Link from "next/link"

export const Nav = ({auth}) => {
    const username = auth?.user.name

    return (
        <div className="bg-slate-200 text-black p-2 flex justify-between items-center">
            <Link className="" href="/">Nemu</Link>
            <div className="flex space-x-4">
                <Link href="/lost-item" className="">Lost Item</Link>
                <Link href="#" className="">Found Item</Link>
            </div>
            <div>
                {username ? (<Button variant="border">{username}</Button>) : (<Button as={Link} href="/login">Login</Button>)}
            </div>
        </div>
    )
}
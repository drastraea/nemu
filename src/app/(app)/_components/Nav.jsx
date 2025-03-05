import { Button } from "@heroui/react"
import Link from "next/link"

export const Nav = ({auth}) => {
    const username = auth?.user.name

    return (
        <div className="bg-slate-100 p-2 flex justify-between items-center rounded-b-lg">
            <Link className="" href="/">Nemu</Link>
            <div className="flex space-x-4">
                <Link href="/lost-item" className="">Lost Item</Link>
                <Link href="#" className="">Found Item</Link>
            </div>
            <div>
                {username ? (<Button variant="border" size="sm">{username}</Button>) : (<Button as={Link} href="/login" variant="border" size="sm">Login</Button>)}
            </div>
        </div>
    )
}
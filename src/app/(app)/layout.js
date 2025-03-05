import { Nav } from "@/app/(app)/_components/Nav";
import { Footer } from "@/app/(app)/_components/Footer";
import { auth } from "@/libs/auth";

const session = await auth();

export default function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen">
            <Nav auth={session} />
            <main className="flex-grow w-6/12 self-center">{children}</main>
            <Footer />
        </div>
    )
}
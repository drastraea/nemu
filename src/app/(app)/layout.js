import { Nav } from "@/app/(app)/_components/Nav";
import { Footer } from "@/app/(app)/_components/Footer";
import { auth } from "@/libs/auth";

export default async function Layout({ children }) {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <Nav session={session} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

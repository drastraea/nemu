import { Nav } from "@/app/(app)/_components/Nav";
import { Footer } from "@/app/(app)/_components/Footer";
import { auth } from "@/libs/auth";

export default async function Layout({ children }) {
  const session = await auth();

  return (
    <div className="relative">
      <Nav session={session} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

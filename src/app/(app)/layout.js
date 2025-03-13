import { Nav } from "@/app/(app)/_components/Nav";
import { Footer } from "@/app/(app)/_components/Footer";
import { auth } from "@/libs/auth";

export default async function Layout({ children }) {

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

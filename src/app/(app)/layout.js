import { Nav } from "@/app/(app)/_components/Nav";
import { Footer } from "@/app/(app)/_components/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <main className="flex-grow lg:w-8/12 self-center py-8">{children}</main>
      <Footer />
    </div>
  );
}

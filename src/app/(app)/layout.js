import { Nav } from "@/app/(app)/_components/Nav";
import { Footer } from "@/app/(app)/_components/Footer";

export default function Layout({ children }) {
  return (
    <div className="relative">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

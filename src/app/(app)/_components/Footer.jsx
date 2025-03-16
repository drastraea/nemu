import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/">
              <Image
                alt="nemu logo"
                src="/images/nemu-w.png"
                width={70}
                height={35}
              />
            </Link>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/lost-item"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Report Lost Item
                </Link>
              </li>
              <li>
                <Link
                  href="/found-item"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Linkedin
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  X
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-white/10 mt-12 pt-8">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} Nemu. All rights reserved.
          </p>
          <h3>Devscale.</h3>
        </div>
      </div>
    </footer>
  )
}

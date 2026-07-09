import Link from "next/link";
import Image from "next/image";
import logo from "@/public/winged-heart-logo.png";

const navLinks = [
  { href: "/merch", label: "Merch" },
  { href: "/signup", label: "Signup" },
  { href: "/listen", label: "Listen" },
  { href: "/#live", label: "Live" },
];

export default function MainNav() {
  return (
    <nav className="flex justify-center gap-4 items-center m-4 | font-display text-fluid-xl">
      <Link href={"/"} aria-label="Home" className="me-auto ">
        <Image
          src={logo}
          alt=""
          className="h-10 w-auto hover:drop-shadow-lg hover:drop-shadow-pink-50"
        />
      </Link>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-shadow-lg hover:text-shadow-pink-50 me-auto"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

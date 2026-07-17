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
      <a
        href={"/"}
        aria-label="Home"
        className="me-auto focus-visible:outline-none"
      >
        <Image
          src={logo}
          alt=""
          className="h-10 w-auto hover:drop-shadow-lg hover:drop-shadow-pink-50 in-focus-visible:drop-shadow-lg in-focus-visible:drop-shadow-pink-50"
        />
      </a>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="hover:text-shadow-lg hover:text-shadow-pink-50 focus-visible:outline-none focus-visible:text-shadow-lg focus-visible:text-shadow-pink-50 me-auto"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

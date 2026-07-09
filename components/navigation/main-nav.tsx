import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/merch", label: "Merch" },
  { href: "/signup", label: "Signup" },
  { href: "/listen", label: "Listen" },
  { href: "/#live", label: "Live" },
];

export default function MainNav() {
  return (
    <nav className="flex justify-center gap-4 items-center m-4 | font-display text-fluid-xl">
      <Link href={"/"} aria-label="Home" className="me-auto hover:underline">
        <Image
          src={"/winged-heart-logo.png"}
          alt=""
          width={680}
          height={450}
          className="h-10 w-auto "
        />
      </Link>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:underline me-auto"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

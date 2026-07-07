import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="flex justify-center gap-4">
      <Link className="me-auto" href={"/"}>
        Home
      </Link>
      <Link href={"/contact"}>Contact</Link>
      <Link className="me-auto" href={"/about"}>
        About
      </Link>
    </nav>
  );
}

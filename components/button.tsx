import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: ReactNode;
  classes?: string;
}

export default function Button({ href, classes, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`relative z-10 font-display font-bold hover:ring-2 hover:ring-pink-50 my-auto p-4 border rounded-2xl ${classes ?? ""}`}
    >
      {children}
    </Link>
  );
}

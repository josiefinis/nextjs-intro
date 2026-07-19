import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: ReactNode;
  scroll?: boolean;
  className?: string;
}

export default function Button({
  href,
  children,
  className,
  scroll = true,
}: ButtonProps) {
  return (
    <Link
      href={href}
      scroll={scroll}
      className={`relative z-10 font-display font-bold hover:ring-2 hover:ring-pink-50 focus-visible:ring-4 focus-visible:ring-pink-50 my-auto p-4 border rounded-2xl ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}

import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: ReactNode;
  classes?: string;
  isDisabled?: boolean;
}

export default function Button({
  href,
  children,
  classes,
  isDisabled = false,
}: ButtonProps) {
  return isDisabled ? (
    <div
      className={`relative z-10 font-display font-bold my-auto p-4 border rounded-2xl ${classes ?? ""}`}
    >
      {children}
    </div>
  ) : (
    <Link
      href={href}
      className={`relative z-10 font-display font-bold hover:ring-2 hover:ring-pink-50 focus-visible:ring-4 focus-visible:ring-pink-50 my-auto p-4 border rounded-2xl ${classes ?? ""}`}
    >
      {children}
    </Link>
  );
}

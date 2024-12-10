import { BrandLogo } from "@/components/BrandLogo";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="flex py-6 shadow-xl sticky top-0 w-full z-10 bg-background/95">
      <nav className="flex items-center gap-5 md:gap-10 container font-semibold">
        <Link href="/" className="mr-auto">
          <BrandLogo />
        </Link>
        <Link className="text-lg" href="/#vehicles">
          Vehículos
        </Link>
        <Link className="text-lg" href="/#info">
          Info
        </Link>
      </nav>
    </header>
  );
}

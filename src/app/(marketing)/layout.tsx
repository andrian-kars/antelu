import { ReactNode } from "react";
import NavBar from "@/components/NavBar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="selection:bg-[hsl(320,65%,52%,20%)] pb-14 md:pb-20">
      <NavBar />
      {children}
    </div>
  );
}

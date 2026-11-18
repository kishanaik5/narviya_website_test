import type { Metadata } from "next";
import { AboutView } from "@/components/views";

export const metadata: Metadata = { title: "About | Narviya" };

export default function Page() {
  return <AboutView />;
}

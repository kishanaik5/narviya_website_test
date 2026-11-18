import type { Metadata } from "next";
import { ServicesView } from "@/components/views";

export const metadata: Metadata = { title: "Services | Narviya" };

export default function Page() {
  return <ServicesView />;
}

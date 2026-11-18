import type { Metadata } from "next";
import { ContactView } from "@/components/views";

export const metadata: Metadata = { title: "Contact | Narviya" };

export default function Page() {
  return <ContactView />;
}

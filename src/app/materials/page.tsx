import type { Metadata } from "next";
import { MaterialsView } from "@/components/views";

export const metadata: Metadata = { title: "Materials | Narviya" };

export default function Page() {
  return <MaterialsView />;
}

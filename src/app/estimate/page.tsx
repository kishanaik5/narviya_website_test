import type { Metadata } from "next";
import { EstimateView } from "@/components/views";

export const metadata: Metadata = { title: "Free Estimate | Narviya" };

export default function Page() {
  return <EstimateView />;
}

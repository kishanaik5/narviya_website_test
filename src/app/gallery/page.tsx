import type { Metadata } from "next";
import { GalleryView } from "@/components/views";

export const metadata: Metadata = { title: "Gallery | Narviya" };

export default function Page() {
  return <GalleryView />;
}

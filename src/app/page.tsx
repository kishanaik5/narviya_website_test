import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HomeView } from "@/components/views";

export const metadata: Metadata = { title: siteConfig.metaTitle };

export default function Page() {
  return <HomeView />;
}

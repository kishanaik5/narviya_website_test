"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { useLang } from "@/lib/useLang";

/** Header + footer + floating widget around every page (except the printable /card page). */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang, setLang } = useLang();

  if (pathname?.startsWith("/card")) return <>{children}</>;

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang} />
      <ChatAssistant lang={lang} />
    </>
  );
}

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";
import { useLang } from "@/lib/useLang";

/** Header + footer + chat assistant around every public page. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang, setLang } = useLang();

  // printable card page and the admin panel have their own layouts
  if (pathname?.startsWith("/card") || pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang} />
      <ChatAssistant lang={lang} />
    </>
  );
}

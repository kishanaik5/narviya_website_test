import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Narviya Designers | Premium Interior & Exterior Spaces",
  description: "Narviya Designers delivers exquisite custom interiors, luxury finishing, glass architecture, wood styling, and durable outdoor safety solutions. Crafted for lifetime durability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

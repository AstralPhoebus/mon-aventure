// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import BackgroundMusic from "@/components/backgroundmusic";

// Dans ton return global :
<BackgroundMusic />


export const metadata = {
  title: "La neige noire",
  description: "Une aventure dont vous êtes le héros (ou la victime).",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}


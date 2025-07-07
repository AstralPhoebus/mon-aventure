// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Script from 'next/script'; // <--- Import for Hotjar
import { SpeedInsights } from "@vercel/speed-insights/next"; // <--- Import for Vercel Speed Insights
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

        {/* Hotjar Tracking Code (place after {children}, before SpeedInsights) */}
        <Script id="hotjar-script" strategy="lazyOnload">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6456699,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>

        {/* Vercel Speed Insights (place at the very end of the body) */}
        <SpeedInsights />
      </body>
    </html>
  );
}

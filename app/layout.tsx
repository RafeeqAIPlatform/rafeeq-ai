import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rafeeqaiplatform.github.io"),
  title: "Rafeeq AI | رفيق AI — التوأم الرقمي الذكي لضيوف الرحمن",
  description:
    "رفيق AI منصة توأم رقمي واستشعار مبكر للمخاطر، تهيئ ضيف الرحمن قبل الرحلة، وترافقه أثناء الحج والعمرة، وتدعم الاستجابة الذكية عند الحاجة.",
  keywords: ["رفيق AI", "الحج", "العمرة", "التوأم الرقمي", "الذكاء الاصطناعي", "رؤية 2030"],
  alternates: {
    canonical: "https://rafeeqaiplatform.github.io/rafeeq-ai/"
  },
  openGraph: {
    title: "Rafeeq AI | رفيق AI",
    description: "التوأم الرقمي الذكي لضيوف الرحمن",
    url: "https://rafeeqaiplatform.github.io/rafeeq-ai/",
    locale: "ar_SA",
    type: "website",
    images: ["https://rafeeqaiplatform.github.io/rafeeq-ai/rafeeq-logo.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafeeq AI | رفيق AI",
    description: "منصة توأم رقمي واستشعار مبكر للمخاطر لضيوف الرحمن.",
    images: ["https://rafeeqaiplatform.github.io/rafeeq-ai/rafeeq-logo.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

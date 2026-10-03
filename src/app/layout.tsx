import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "성남시 생활 정보 | 축제·행사 & 복지·지원금 소식",
  description: "성남시의 최신 문화 행사, 축제 일정 및 놓치기 쉬운 청년·출산 지원금과 혜택 정보를 한눈에 확인하세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${notoSans.className} min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

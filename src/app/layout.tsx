import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "남양주시 생활 정보 | 행사·혜택·지원금 안내",
  description: "남양주시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보를 매일 업데이트합니다.",
  openGraph: {
    title: "남양주시 생활 정보 | 행사·혜택·지원금 안내",
    description: "남양주시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보를 매일 업데이트합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://my-blog-80o.pages.dev";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "남양주시 생활 정보",
    url: siteUrl,
    description: "남양주시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보",
    inLanguage: "ko-KR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "블로그",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "글 제목",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isAdSenseActive = Boolean(
    adsenseId && adsenseId !== "나중에_입력" && adsenseId.trim() !== ""
  );

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isGaActive = Boolean(
    gaId && gaId !== "나중에_입력" && gaId.trim() !== ""
  );

  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {isGaActive && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        {isAdSenseActive && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body
        className={`${notoSans.className} min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}

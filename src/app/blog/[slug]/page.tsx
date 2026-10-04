import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import localData from "../../../../public/data/local-info.json";
import AdBanner from "@/components/AdBanner";
import CoupangBanner from "@/components/CoupangBanner";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  if (posts.length === 0) {
    return [{ slug: "_empty" }];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "글을 찾을 수 없습니다" };
  }

  return {
    title: `${post.title} | 우리 동네 소식통 블로그`,
    description: post.summary,
    openGraph: {
      title: `${post.title} | 우리 동네 소식통 블로그`,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const matchedInfo = (localData.items as Array<{ title?: string; name?: string; link?: string }>).find(
    (item) =>
      (item.title && post.title.includes(item.title)) ||
      (item.name && post.title.includes(item.name)) ||
      (item.title && item.title.includes(post.title))
  );
  const sourceUrl = matchedInfo?.link && matchedInfo.link !== "#" ? matchedInfo.link : "https://www.data.go.kr";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://my-blog-80o.pages.dev";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.summary,
    author: {
      "@type": "Organization",
      name: "남양주시 생활 정보",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "남양주시 생활 정보",
      url: siteUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#f6f5f4] text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* 1. 상단 글로벌 네비게이션 바 */}
      <header className="sticky top-0 z-50 bg-[#f6f5f4]/85 backdrop-blur-md border-b border-black/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#111111] group transition-opacity hover:opacity-85"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-[6px] bg-white border border-black/[0.08] shadow-2xs text-base">
              📖
            </span>
            <span className="font-semibold text-base tracking-tight text-[#111111]">
              우리 동네 소식통
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="px-3 py-1.5 text-xs font-medium text-[#615d59] border border-black/[0.08] hover:text-[#111111] hover:bg-black/5 rounded-[8px] transition-all bg-white"
            >
              ← 목록
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#0075de] hover:bg-[#0062bd] rounded-[8px] transition-colors"
            >
              홈
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 블로그 본문 카드 (Notion Document Style) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <article className="bg-white rounded-[12px] border border-black/[0.08] overflow-hidden shadow-2xs">
          {/* 아티클 헤더 */}
          <div className="p-6 sm:p-10 border-b border-black/[0.06] bg-[#f6f5f4]/50 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#0075de] bg-[#e6f3fe] px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-[#757575]">
                  발행일: {post.date}
                </span>
              </div>
              <span className="text-xs text-[#757575]">
                남양주시 공공데이터 검증
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-[#111111] leading-tight tracking-tight">
              {post.title}
            </h1>

            {post.summary && (
              <div className="p-4 rounded-[10px] bg-white border border-black/[0.08] text-[#615d59] text-sm leading-relaxed flex items-start gap-2.5 shadow-2xs">
                <span className="text-lg shrink-0">💡</span>
                <div>
                  <strong className="text-[#111111] block mb-0.5">핵심 요약</strong>
                  <span>{post.summary}</span>
                </div>
              </div>
            )}

            {/* 태그 목록 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#615d59] bg-white border border-black/[0.08] px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 마크다운 본문 */}
          <div className="p-6 sm:p-10">
            <div className="prose prose-neutral max-w-none text-[#111111] leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#111111] prose-p:text-[#4d4d4d] prose-p:leading-relaxed prose-a:text-[#0075de] hover:prose-a:underline prose-strong:text-[#111111] prose-img:rounded-[12px] text-sm sm:text-base">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* 본문 하단 AdSense 광고 */}
            <div className="my-8">
              <AdBanner />
            </div>

            {/* 쿠팡 파트너스 배너 */}
            <div className="my-6">
              <CoupangBanner />
            </div>

            {/* 출처 및 투명성 안내 박스 (Notion Callout) */}
            <section className="mt-12 p-5 sm:p-6 rounded-[10px] bg-[#f6f5f4] border border-black/[0.08] space-y-3 text-xs sm:text-sm text-[#615d59]">
              <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
                <span className="text-[#111111] flex items-center gap-1.5 font-bold">
                  <span>🏛️</span>
                  <span>정보 출처 및 행정 안내</span>
                </span>
                <span className="text-xs text-[#757575]">
                  최종 업데이트: {post.date}
                </span>
              </div>

              <p className="leading-relaxed text-[#4d4d4d]">
                본 안내문은 대한민국 공공데이터포털(data.go.kr)의 공공누리 제1유형 저작물을 기반으로 남양주시민을 위해 알기 쉽게 요약·정리되었습니다. 지원 요건과 서류 접수는 아래 공식 기관 페이지를 통해 확인하실 수 있습니다.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-[#757575]">
                  출처: 대한민국 공공데이터포털 / 남양주시청
                </span>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-white border border-black/[0.08] hover:border-black/20 text-[#111111] px-3.5 py-1.5 rounded-[8px] text-xs font-medium transition-all shadow-2xs"
                >
                  <span>공식 원문 바로가기</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            {/* 하단 페이지 이동 버튼 */}
            <div className="mt-10 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[8px] border border-black/[0.08] hover:bg-black/5 bg-white text-[#111111] text-xs font-medium transition-all"
              >
                ← 목록으로 돌아가기
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#0075de] hover:bg-[#0062bd] text-white text-xs font-medium transition-colors"
              >
                메인 생활정보 보기 →
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* 3. 푸터 */}
      <footer className="mt-20 border-t border-black/[0.08] bg-[#f6f5f4] py-12 text-xs text-[#757575]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-base">📖</span>
              <span className="text-[#111111] font-semibold">
                우리 동네 소식통
              </span>
              <span className="text-black/20">/</span>
              <span>상세 안내글</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#615d59]">
              <Link href="/" className="hover:text-[#0075de] transition-colors">홈</Link>
              <Link href="/blog" className="hover:text-[#0075de] transition-colors">블로그</Link>
              <Link href="/about" className="hover:text-[#0075de] transition-colors">서비스 소개</Link>
              <Link href="/privacy" className="hover:text-[#0075de] transition-colors">개인정보처리방침</Link>
            </nav>
          </div>

          <div className="text-[12px] text-[#757575]">
            남양주시 생활정보 포털 • 공식 축제 및 맞춤형 지원금 소식
          </div>
        </div>
      </footer>
    </div>
  );
}

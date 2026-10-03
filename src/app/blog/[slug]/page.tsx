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

// 정적 빌드용 사전 경로 생성
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

  // local-info.json에서 원문 출처 링크 매칭
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
    <div className="min-h-screen bg-[#F7F9FA] text-[#222222]">
      {/* BlogPosting 구조화 데이터 (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {/* 상단 미니 헤더 */}
      <header className="bg-sky-500 text-white shadow-xs">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white font-bold hover:text-sky-100 transition-colors"
          >
            <span className="text-xl">🏙️</span>
            <span className="text-lg tracking-tight">우리 동네 소식통</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold transition-all"
            >
              소개
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-sky-600 hover:bg-sky-50 text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              ← 블로그 목록
            </Link>
          </div>
        </div>
      </header>

      {/* 블로그 본문 카드 */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* 아티클 헤더 */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-sky-50/30">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-600 text-white">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>발행일: {post.date}</span>
                <span>•</span>
                {/* 4. 최신성 표시 */}
                <span className="font-semibold text-sky-700">최종 업데이트: {post.date}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              {post.title}
            </h1>

            {post.summary && (
              <p className="mt-4 p-4 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm sm:text-base leading-relaxed">
                💡 {post.summary}
              </p>
            )}

            {/* 태그 목록 */}
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-sky-700 bg-sky-50 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 마크다운 본문 (react-markdown 렌더링) */}
          <div className="p-6 sm:p-8">
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-sky-600 hover:prose-a:underline prose-img:rounded-xl leading-relaxed text-slate-800 text-sm sm:text-base">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* 본문 하단 AdSense 광고 */}
            <AdBanner className="my-8" />

            {/* 쿠팡 파트너스 배너 */}
            <CoupangBanner className="my-6" />

            {/* 1. AI 생성 정보 공개 & 2. 출처 명시 강화 (E-E-A-T 최적화) */}
            <section className="mt-12 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>정보 출처 및 AI 작성 안내</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  최종 업데이트: {post.date}
                </span>
              </div>

              <p className="leading-relaxed text-slate-700">
                이 글은 공공데이터포털(data.go.kr)의 정보를 바탕으로 AI가 작성하였습니다. 정확한 내용은 원문 링크를 통해 확인해주세요.
              </p>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-slate-500 text-xs">
                  출처: 대한민국 공공데이터포털 (공공누리 제1유형)
                </div>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-sky-500 hover:text-sky-600 font-bold text-slate-800 shadow-2xs transition-all"
                >
                  <span>공식 원문 링크 확인하기</span>
                  <span>→</span>
                </a>
              </div>
            </section>

            {/* 하단 네비게이션 */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold text-sm transition-all"
              >
                ← 목록으로 돌아가기
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-all shadow-xs"
              >
                메인 생활정보 보기 →
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* 푸터 */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500 text-center space-y-2">
        <div className="flex flex-wrap justify-center items-center gap-3 font-semibold text-slate-600 mb-2">
          <Link href="/" className="hover:text-sky-600 transition-colors">홈</Link>
          <span>•</span>
          <Link href="/blog" className="hover:text-sky-600 transition-colors">블로그</Link>
          <span>•</span>
          <Link href="/about" className="hover:text-sky-600 transition-colors">서비스 소개</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-sky-600 transition-colors text-slate-700 font-bold">개인정보처리방침</Link>
        </div>
        <p className="font-semibold text-slate-700">우리 동네 소식통 블로그</p>
        <p className="mt-1">남양주시 생활정보 • 축제 & 지원금 소식</p>
      </footer>
    </div>
  );
}

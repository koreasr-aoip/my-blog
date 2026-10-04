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
    <div className="min-h-screen bg-[#fafafa] text-[#171717] selection:bg-[#171717] selection:text-white">
      {/* BlogPosting 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* 1. 상단 글로벌 네비게이션 바 */}
      <header className="sticky top-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#ebebeb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#171717] group transition-opacity hover:opacity-80"
          >
            <span className="text-black text-sm select-none">▲</span>
            <span className="font-mono text-xs tracking-wider text-[#666666] uppercase">
              NAMYANGJU
            </span>
            <span className="font-medium text-sm text-[#171717] tracking-tight">
              우리 동네 소식통
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="px-3 py-1.5 text-xs font-normal text-[#4d4d4d] border border-[#ebebeb] hover:text-[#171717] hover:border-[#171717] rounded-[6px] transition-all bg-white"
            >
              ← 목록
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 text-xs font-normal text-white bg-[#171717] hover:bg-black rounded-[6px] transition-colors"
            >
              홈
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 블로그 본문 카드 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <article className="bg-[#ffffff] rounded-[6px] border border-[#ebebeb] overflow-hidden">
          {/* 아티클 헤더 */}
          <div className="p-6 sm:p-10 border-b border-[#ebebeb] bg-[#fafafa] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#297a3a] bg-[#ffffff] border border-[#ebebeb] px-2 py-0.5 rounded-[4px]">
                  ✓ {post.category}
                </span>
                <span className="font-mono text-[11px] text-[#8f8f8f]">
                  PUB: {post.date}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#666666]">
                UPDATED: {post.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-normal text-[#171717] leading-tight tracking-[-0.03em]">
              {post.title}
            </h1>

            {post.summary && (
              <div className="p-4 rounded-[6px] bg-[#ffffff] border border-[#ebebeb] text-[#4d4d4d] text-sm leading-relaxed font-mono">
                <span className="text-[#171717] font-semibold">▲ SUMMARY:</span> {post.summary}
              </div>
            )}

            {/* 태그 목록 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[#666666] bg-[#ffffff] border border-[#ebebeb] px-2 py-0.5 rounded-[4px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 마크다운 본문 */}
          <div className="p-6 sm:p-10">
            <div className="prose prose-neutral max-w-none prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-[#171717] prose-p:text-[#4d4d4d] prose-p:leading-relaxed prose-a:text-[#171717] prose-a:underline prose-strong:text-[#171717] prose-img:rounded-[6px] text-sm sm:text-base">
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

            {/* 정보 출처 및 투명성 안내 (CLI Style) */}
            <section className="mt-12 p-5 sm:p-6 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#ebebeb]">
                <span className="text-[#171717] flex items-center gap-1.5 font-medium">
                  <span>▲</span>
                  <span>SOURCE ATTRIBUTION & TRANSPARENCY</span>
                </span>
                <span className="text-[11px] text-[#8f8f8f]">
                  SYNC: {post.date}
                </span>
              </div>

              <p className="leading-relaxed text-[#4d4d4d] font-sans text-xs sm:text-sm">
                본 게시물은 대한민국 공공데이터포털(data.go.kr)의 공공누리 제1유형 공공 저작물을 기반으로 정확하게 정리되었습니다. 세부 참여 신청 및 최종 일정은 아래 공식 기관 원문을 통해 확인하실 수 있습니다.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans">
                <span className="text-[#8f8f8f] text-xs">
                  출처: 대한민국 공공데이터포털 (data.go.kr)
                </span>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 bg-[#ffffff] border border-[#ebebeb] hover:border-[#171717] text-[#171717] px-3 py-1.5 rounded-[6px] text-xs font-normal transition-all"
                >
                  <span>공식 원문 바로가기</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            {/* 하단 페이지 이동 버튼 */}
            <div className="mt-10 pt-6 border-t border-[#ebebeb] flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[6px] border border-[#ebebeb] hover:border-[#171717] bg-[#ffffff] text-[#171717] text-xs font-normal transition-all"
              >
                ← 목록으로 돌아가기
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[6px] bg-[#171717] hover:bg-black text-white text-xs font-normal transition-colors"
              >
                메인 생활정보 보기 →
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* 3. 푸터 */}
      <footer className="mt-20 border-t border-[#ebebeb] bg-[#fafafa] py-12 text-xs text-[#666666]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ebebeb] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-black text-xs">▲</span>
              <span className="font-mono text-xs text-[#171717] tracking-wider uppercase font-medium">
                우리 동네 소식통
              </span>
              <span className="text-[#c9c9c9]">/</span>
              <span className="text-[#8f8f8f] font-mono text-[11px]">POST DETAILS</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#666666]">
              <Link href="/" className="hover:text-[#171717] transition-colors">홈</Link>
              <Link href="/blog" className="hover:text-[#171717] transition-colors">블로그</Link>
              <Link href="/about" className="hover:text-[#171717] transition-colors">서비스 소개</Link>
              <Link href="/privacy" className="hover:text-[#171717] transition-colors">개인정보처리방침</Link>
            </nav>
          </div>

          <div className="font-mono text-[11px] text-[#8f8f8f]">
            남양주시 생활정보 포털 • 공식 축제 및 맞춤형 지원금 소식
          </div>
        </div>
      </footer>
    </div>
  );
}

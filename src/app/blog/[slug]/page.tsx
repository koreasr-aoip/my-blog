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

  const allPosts = getAllPosts();
  // 현재 글을 제외한 다른 추천 글 2개
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const matchedInfo = (localData.items as Array<{
    id?: string;
    slug?: string;
    title?: string;
    name?: string;
    summary?: string;
    target?: string;
    period?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    category?: string;
    tags?: string[];
    link?: string;
    time?: string;
    inquiry?: string;
    fee?: string;
  }>).find(
    (item) =>
      item.slug === slug ||
      (item.title && post.title.includes(item.title)) ||
      (item.title && item.title.includes(post.title))
  );

  const sourceUrl =
    matchedInfo?.link && matchedInfo.link !== "#"
      ? matchedInfo.link
      : "https://www.data.go.kr";

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

  const isEvent = post.category === "행사";

  return (
    <div className="min-h-screen bg-[#f6f5f4] text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* 1. 상단 글로벌 네비게이션 바 (메인 페이지와 동일한 톤앤매너) */}
      <header className="sticky top-0 z-50 bg-[#f6f5f4]/90 backdrop-blur-md border-b border-black/[0.08]">
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
            <span className="hidden sm:inline-block text-[12px] px-2 py-0.5 rounded-full bg-black/5 text-[#757575] font-medium">
              남양주
            </span>
          </Link>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#757575] hover:text-[#111111] hover:bg-black/5 rounded-[8px] transition-all"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#111111] bg-white border border-black/[0.08] rounded-[8px] shadow-2xs"
            >
              블로그
            </Link>
            <Link
              href="/about"
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#757575] hover:text-[#111111] hover:bg-black/5 rounded-[8px] transition-all"
            >
              소개
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. 본문 컨테이너 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* 상단 브레드크럼 (경로 안내) */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-xs text-[#757575] overflow-x-auto whitespace-nowrap"
        >
          <Link href="/" className="hover:text-[#0075de] transition-colors">
            홈
          </Link>
          <span className="text-black/20">/</span>
          <Link href="/blog" className="hover:text-[#0075de] transition-colors">
            블로그
          </Link>
          <span className="text-black/20">/</span>
          <span className="font-medium text-[#111111]">
            {isEvent ? "🎪 축제·행사" : "🎁 지원금·혜택"}
          </span>
        </nav>

        {/* 아티클 메인 카드 (노션 도큐먼트 스타일) */}
        <article className="bg-white rounded-[12px] border border-black/[0.08] overflow-hidden shadow-2xs">
          {/* 헤더 섹션 */}
          <div className="p-6 sm:p-10 border-b border-black/[0.06] bg-[#fbfbfa] space-y-5">
            {/* 메타 배지 라인 */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                    isEvent
                      ? "bg-[#ffb110]/20 text-[#8c5700] border-[#ffb110]/40"
                      : "bg-[#e6f3fe] text-[#0075de] border-[#0075de]/20"
                  }`}
                >
                  <span>{isEvent ? "🎪" : "🎁"}</span>
                  <span>{post.category}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#757575] bg-[#f6f5f4] border border-black/[0.06] px-2.5 py-0.5 rounded-full">
                  <span>📅</span>
                  <span>{post.date}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#757575] bg-[#f6f5f4] border border-black/[0.06] px-2.5 py-0.5 rounded-full">
                  <span>⏱️</span>
                  <span>약 3분 읽기</span>
                </span>
              </div>
              <span className="text-xs text-[#757575] font-medium hidden sm:inline-flex items-center gap-1">
                <span>🏛️</span>
                <span>남양주시 공공데이터 검증</span>
              </span>
            </div>

            {/* 글 제목 */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] leading-[1.3] tracking-tight">
              {post.title}
            </h1>

            {/* 태그 목록 */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#615d59] bg-[#f6f5f4] border border-black/[0.06] px-2.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 메인 페이지 느낌의 [생활 수첩 핵심 요약 카드] */}
            <div className="mt-4 p-5 sm:p-6 rounded-[10px] bg-[#fff9e6] border border-[#ffb110]/40 text-[#111111] space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#b18164]">
                <span className="text-base">📝</span>
                <span>남양주 생활 수첩 핵심 노트</span>
              </div>

              {post.summary && (
                <p className="text-sm sm:text-base text-[#333333] leading-relaxed font-normal">
                  {post.summary}
                </p>
              )}

              {/* 핵심 정보 그리드 (대상, 일정, 장소, 문의처 등) */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                <div className="p-3 bg-white/90 border border-[#ffb110]/30 rounded-[8px] space-y-1">
                  <div className="text-[12px] font-bold text-[#b18164] flex items-center gap-1">
                    <span>🎯</span>
                    <span>{isEvent ? "참여 대상" : "지원 대상"}</span>
                  </div>
                  <p className="text-[#111111] font-medium leading-snug">
                    {matchedInfo?.target || "남양주시민 누구나"}
                  </p>
                </div>

                <div className="p-3 bg-white/90 border border-[#ffb110]/30 rounded-[8px] space-y-1">
                  <div className="text-[12px] font-bold text-[#b18164] flex items-center gap-1">
                    <span>📅</span>
                    <span>{isEvent ? "행사 일정" : "신청/접수 기간"}</span>
                  </div>
                  <p className="text-[#111111] font-medium leading-snug">
                    {matchedInfo?.startDate && matchedInfo?.endDate
                      ? `${matchedInfo.startDate} ~ ${matchedInfo.endDate}`
                      : matchedInfo?.time || "상시 접수 및 운영"}
                  </p>
                </div>

                <div className="p-3 bg-white/90 border border-[#ffb110]/30 rounded-[8px] space-y-1">
                  <div className="text-[12px] font-bold text-[#b18164] flex items-center gap-1">
                    <span>📍</span>
                    <span>{isEvent ? "행사 장소" : "접수 및 신청처"}</span>
                  </div>
                  <p className="text-[#111111] font-medium leading-snug">
                    {matchedInfo?.location || "온라인 접수 및 관할 행정복지센터"}
                  </p>
                </div>

                <div className="p-3 bg-white/90 border border-[#ffb110]/30 rounded-[8px] space-y-1">
                  <div className="text-[12px] font-bold text-[#b18164] flex items-center gap-1">
                    <span>📞</span>
                    <span>문의 안내</span>
                  </div>
                  <p className="text-[#111111] font-medium leading-snug">
                    {matchedInfo?.inquiry || "남양주시청 또는 관할 주민센터"}
                  </p>
                </div>
              </div>

              {matchedInfo?.link && matchedInfo.link !== "#" && (
                <div className="pt-2 flex justify-end">
                  <a
                    href={matchedInfo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0075de] hover:underline"
                  >
                    <span>공식 신청/접수 포털 바로가기</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* 마크다운 본문 영역 (가독성 최적화 & 노션 서식 렌더링) */}
          <div className="p-6 sm:p-10">
            <div className="article-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] mt-10 mb-4 pb-2.5 border-b border-black/[0.08]">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mt-12 mb-4 pb-2.5 border-b border-black/[0.08] flex items-center gap-2.5">
                      <span className="w-1.5 h-6 rounded-full bg-[#0075de] inline-block shrink-0" />
                      <span>{children}</span>
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl font-bold text-[#111111] mt-8 mb-3 flex items-center gap-2">
                      <span className="text-[#0075de] text-sm">▶</span>
                      <span>{children}</span>
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-base sm:text-lg font-bold text-[#111111] mt-6 mb-2">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-[16px] sm:text-[17px] text-[#2d2d2d] leading-[1.85] my-4 font-normal">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-6 p-4 sm:p-5 bg-[#fffdfa] border border-[#ffb110]/40 rounded-[10px] text-[#2d2d2d] leading-relaxed shadow-2xs not-italic">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-4 space-y-2.5 pl-5 list-disc text-[16px] sm:text-[17px] text-[#2d2d2d] marker:text-[#0075de]">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-4 space-y-2.5 pl-5 list-decimal text-[16px] sm:text-[17px] text-[#2d2d2d] marker:text-[#0075de] marker:font-semibold">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-[1.75] pl-1">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-[#111111] bg-[#ffb110]/20 px-1 py-0.5 rounded-[4px]">
                      {children}
                    </strong>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[#0075de] font-semibold underline underline-offset-4 decoration-[#0075de]/30 hover:decoration-[#0075de] transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="my-10 border-t border-black/[0.08]" />,
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6 rounded-[10px] border border-black/[0.08]">
                      <table className="w-full border-collapse text-sm sm:text-base">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="bg-[#f6f5f4] text-[#111111] font-semibold p-3 sm:p-3.5 border-b border-black/[0.08] text-left">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="p-3 sm:p-3.5 border-b border-black/[0.06] text-[#333333]">
                      {children}
                    </td>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* 본문 하단 AdSense 광고 */}
            <div className="my-10">
              <AdBanner />
            </div>

            {/* 쿠팡 파트너스 배너 */}
            <div className="my-8">
              <CoupangBanner />
            </div>

            {/* 출처 및 행정 안내 카드 (Notion Style Callout) */}
            <section className="mt-12 p-5 sm:p-6 rounded-[10px] bg-[#f6f5f4] border border-black/[0.08] space-y-3.5 text-xs sm:text-sm text-[#615d59]">
              <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.06]">
                <span className="text-[#111111] flex items-center gap-1.5 font-bold">
                  <span>🏛️</span>
                  <span>정보 출처 및 행정 안내</span>
                </span>
                <span className="text-xs text-[#757575]">
                  최종 검증일: {post.date}
                </span>
              </div>

              <p className="leading-relaxed text-[#4d4d4d]">
                본 안내문은 대한민국 공공데이터포털(data.go.kr) 및 남양주시청 공식 고시·공고 데이터를 바탕으로 시민 여러분의 이해를 돕기 위해 친절하게 정리되었습니다. 신청 기한이나 세부 구비 서류는 관할 부서 사정에 따라 변동될 수 있으므로 접수 전 공식 원문을 확인해 주시기 바랍니다.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-[#757575]">
                  데이터 제공: 대한민국 공공데이터포털 / 남양주시청
                </span>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#0075de] hover:bg-[#0062bd] text-white px-4 py-2 rounded-[8px] text-xs font-semibold transition-colors shadow-2xs"
                >
                  <span>공식 원문·신청처 바로가기</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>

            {/* 하단 네비게이션 버튼 바 */}
            <div className="mt-10 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[8px] border border-black/[0.08] hover:bg-black/5 bg-white text-[#111111] text-xs font-medium transition-all"
              >
                ← 블로그 전체 목록 보기
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[8px] bg-[#0075de] hover:bg-[#0062bd] text-white text-xs font-medium transition-colors"
              >
                메인 생활 수첩 바로가기 →
              </Link>
            </div>
          </div>
        </article>

        {/* 3. 함께 보면 유용한 남양주 생활 소식 (메인 페이지 카드 디자인 적용) */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 sm:mt-16 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">💡</span>
                <h2 className="text-base sm:text-lg font-bold text-[#111111]">
                  함께 읽으면 좋은 남양주 소식
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs text-[#0075de] hover:underline font-medium"
              >
                더보기 →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => {
                const isRelatedEvent = related.category === "행사";
                return (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block p-5 rounded-[12px] bg-white border border-black/[0.08] hover:border-black/20 hover:shadow-2xs transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${
                          isRelatedEvent
                            ? "bg-[#ffb110]/20 text-[#8c5700]"
                            : "bg-[#e6f3fe] text-[#0075de]"
                        }`}
                      >
                        {related.category}
                      </span>
                      <time className="text-[12px] text-[#757575]">
                        {related.date}
                      </time>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#111111] group-hover:text-[#0075de] transition-colors line-clamp-2 leading-snug">
                      {related.title}
                    </h3>

                    <p className="text-xs text-[#615d59] line-clamp-2 leading-relaxed">
                      {related.summary}
                    </p>

                    <div className="pt-1 flex items-center text-xs font-medium text-[#0075de] group-hover:translate-x-0.5 transition-transform">
                      <span>자세히 보기</span>
                      <span className="ml-1">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* 4. 푸터 (메인 페이지와 동일한 노션 스타일) */}
      <footer className="mt-20 border-t border-black/[0.08] bg-[#f6f5f4] py-12 text-xs text-[#757575]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-base">📖</span>
              <span className="text-[#111111] font-semibold">
                우리 동네 소식통
              </span>
              <span className="text-black/20">/</span>
              <span>남양주시 생활 정보 수첩</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#615d59]">
              <Link href="/" className="hover:text-[#0075de] transition-colors">
                홈
              </Link>
              <Link
                href="/blog"
                className="hover:text-[#0075de] transition-colors"
              >
                블로그
              </Link>
              <Link
                href="/about"
                className="hover:text-[#0075de] transition-colors"
              >
                서비스 소개
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[#0075de] transition-colors"
              >
                개인정보처리방침
              </Link>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] text-[#757575]">
            <p>남양주시 생활정보 포털 • 공식 축제 및 맞춤형 지원금 소식</p>
            <p>본 사이트의 정보는 공공누리 제1유형에 따라 배포됩니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

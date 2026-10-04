import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "블로그 소식 | 우리 동네 소식통",
  description: "남양주시의 최신 생활 정보, 축제 후기 및 알짜 지원금 꿀팁을 전해드립니다.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] selection:bg-[#171717] selection:text-white">
      {/* 1. 상단 글로벌 네비게이션 바 */}
      <header className="sticky top-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#ebebeb]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#666666] hover:text-[#171717] hover:bg-[#ffffff] rounded-[6px] transition-all"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#171717] bg-[#ffffff] border border-[#ebebeb] rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              블로그
            </Link>
            <Link
              href="/about"
              className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#666666] hover:text-[#171717] hover:bg-[#ffffff] rounded-[6px] transition-all"
            >
              소개
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. 블로그 헤더 섹션 */}
      <section className="border-b border-[#ebebeb] bg-[#fafafa] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
            <span className="text-black">▲</span>
            <span>PUBLIC ARCHIVE & INSIGHTS</span>
            <span className="text-[#ebebeb]">/</span>
            <span className="text-[#297a3a] font-mono">ALL ARTICLES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-[#171717] leading-tight">
            동네 알짜 생활 블로그
          </h1>

          <p className="text-sm sm:text-base text-[#4d4d4d] max-w-xl leading-relaxed">
            시민 여러분이 꼭 알아야 할 축제 방문 꿀팁과 실질적인 혜택 신청 절차를
            쉽고 상세하게 기록합니다.
          </p>
        </div>
      </section>

      {/* 3. 포스트 목록 본문 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#ebebeb]">
          <div className="flex items-center gap-2">
            <span className="text-black text-xs">▲</span>
            <h2 className="text-lg sm:text-xl font-normal tracking-tight text-[#171717]">
              발행된 게시글
            </h2>
          </div>
          <span className="font-mono text-[11px] text-[#8f8f8f] uppercase">
            TOTAL: <strong className="text-[#171717] font-semibold">{posts.length}</strong> POSTS
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="bg-[#ffffff] rounded-[6px] border border-[#ebebeb] p-12 text-center space-y-3">
            <span className="font-mono text-xs text-[#8f8f8f]">▲ EMPTY ARCHIVE</span>
            <h3 className="text-base font-medium text-[#171717]">
              아직 등록된 블로그 글이 없습니다
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] max-w-sm mx-auto">
              매일 새로운 축제 후기와 맞춤형 지원금 정보 글이 자동으로 게시됩니다.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-[#171717] text-white hover:bg-black px-4 py-2 rounded-[6px] text-xs font-normal transition-colors"
              >
                메인 생활정보 보러가기 →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#ffffff] rounded-[6px] border border-[#ebebeb] p-5 sm:p-6 transition-all hover:border-[#c9c9c9] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#666666] bg-[#fafafa] border border-[#ebebeb] px-1.5 py-0.5 rounded-[4px]">
                      {post.category}
                    </span>
                    <time className="font-mono text-[11px] text-[#8f8f8f]">
                      {post.date}
                    </time>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="block text-base sm:text-lg font-medium text-[#171717] hover:underline underline-offset-4 tracking-tight mb-2"
                  >
                    {post.title}
                  </Link>

                  <p className="text-xs sm:text-sm text-[#4d4d4d] line-clamp-2 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ebebeb] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-[#8f8f8f]">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 bg-[#fafafa] border border-[#ebebeb] text-[#666666] rounded-[4px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-normal text-[#171717] hover:underline underline-offset-4"
                  >
                    본문 읽기 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* 4. 푸터 */}
      <footer className="mt-20 border-t border-[#ebebeb] bg-[#fafafa] py-12 text-xs text-[#666666]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ebebeb] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-black text-xs">▲</span>
              <span className="font-mono text-xs text-[#171717] tracking-wider uppercase font-medium">
                우리 동네 소식통
              </span>
              <span className="text-[#c9c9c9]">/</span>
              <span className="text-[#8f8f8f] font-mono text-[11px]">BLOG ARCHIVE</span>
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

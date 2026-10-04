import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BlogFilterList from "@/components/BlogFilterList";

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
            <span className="text-[#297a3a] font-mono">CATEGORIZED DISPATCH</span>
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

      {/* 3. 포스트 목록 본문 (카테고리 필터 탭 적용) */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <BlogFilterList posts={posts} />
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

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
    <div className="min-h-screen bg-[#f6f5f4] text-[#111111]">
      {/* 1. 상단 글로벌 네비게이션 바 */}
      <header className="sticky top-0 z-50 bg-[#f6f5f4]/85 backdrop-blur-md border-b border-black/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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

      {/* 2. 블로그 헤더 섹션 */}
      <section className="border-b border-black/[0.08] bg-[#f6f5f4] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/[0.08] rounded-full text-xs font-medium text-[#615d59] shadow-2xs">
            <span>✍️</span>
            <span>남양주 생활 아카이브</span>
            <span className="text-black/15">•</span>
            <span className="text-[#0075de] font-medium">총 {posts.length}편의 안내글</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] leading-tight">
            동네 알짜 생활 블로그
          </h1>

          <p className="text-sm sm:text-base text-[#615d59] max-w-xl leading-relaxed">
            시민 여러분이 꼭 알아야 할 축제 방문 꿀팁과 실질적인 혜택 신청 절차를
            따뜻한 노트처럼 꼼꼼하게 기록합니다.
          </p>
        </div>
      </section>

      {/* 3. 포스트 목록 본문 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <BlogFilterList posts={posts} />
      </main>

      {/* 4. 푸터 */}
      <footer className="mt-20 border-t border-black/[0.08] bg-[#f6f5f4] py-12 text-xs text-[#757575]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-base">📖</span>
              <span className="text-[#111111] font-semibold">
                우리 동네 소식통
              </span>
              <span className="text-black/20">/</span>
              <span>블로그 아카이브</span>
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

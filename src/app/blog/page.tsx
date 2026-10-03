import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "블로그 소식 | 우리 동네 소식통",
  description: "성남시의 최신 생활 정보, 축제 후기 및 알짜 지원금 꿀팁을 전해드립니다.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#222222]">
      {/* 상단 헤더 */}
      <header className="bg-sky-500 text-white shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-bold hover:text-sky-100 transition-colors"
            >
              <span className="text-xl">🏙️</span>
              <span className="text-xl tracking-tight">우리 동네 소식통</span>
            </Link>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black drop-shadow-xs">
              동네 알짜 생활 블로그
            </h1>
          </div>

          <nav className="flex items-center gap-2 text-sm font-semibold">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded-lg bg-white text-sky-600 shadow-xs"
            >
              블로그
            </Link>
            <Link
              href="/about"
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              소개
            </Link>
          </nav>
        </div>
      </header>

      {/* 블로그 포스트 목록 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-slate-900">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>📝 최신 발행 글</span>
          </h2>
          <span className="text-xs text-slate-500">
            총 <strong className="text-sky-600 font-bold">{posts.length}</strong>개의 글
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
            <span className="text-4xl block">✍️</span>
            <h3 className="text-lg font-bold text-slate-700">
              아직 등록된 블로그 글이 없습니다
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              매일 자동으로 새로운 축제 후기와 맞춤형 지원금 정보 글이 작성될 예정입니다.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold rounded-lg transition-colors shadow-xs"
              >
                메인 생활정보 보러가기 →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded">
                      {post.category}
                    </span>
                    <time className="text-xs text-slate-400 font-medium">
                      {post.date}
                    </time>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="block text-xl font-bold text-slate-900 hover:text-sky-600 transition-colors mb-2"
                  >
                    {post.title}
                  </Link>

                  {/* summary 필드를 블로그 목록의 미리보기 텍스트로 사용 */}
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-sky-600 hover:text-sky-700"
                  >
                    글 읽기 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500 text-center">
        <p className="font-semibold text-slate-700">우리 동네 소식통 블로그</p>
        <p className="mt-1">성남시 생활정보 • 축제 & 지원금 소식</p>
      </footer>
    </div>
  );
}

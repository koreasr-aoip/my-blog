import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

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
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#222222]">
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
              href="/blog"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold transition-all"
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
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-600 text-white">
                {post.category}
              </span>
              <time className="text-xs text-slate-500 font-medium">
                발행일: {post.date}
              </time>
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

            {/* 하단 네비게이션 */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
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
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500 text-center">
        <p className="font-semibold text-slate-700">우리 동네 소식통 블로그</p>
        <p className="mt-1">성남시 생활정보 • 축제 & 지원금 소식</p>
      </footer>
    </div>
  );
}

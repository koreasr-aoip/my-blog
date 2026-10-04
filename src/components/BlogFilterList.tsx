"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts";

interface BlogFilterListProps {
  posts: Post[];
}

export default function BlogFilterList({ posts }: BlogFilterListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const filteredPosts =
    selectedCategory === "전체"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const eventCount = posts.filter((p) => p.category === "행사").length;
  const benefitCount = posts.filter((p) => p.category === "혜택").length;

  return (
    <div className="space-y-6">
      {/* 카테고리 필터 탭 (Vercel Style) */}
      <div className="flex items-center gap-1.5 border-b border-[#ebebeb] pb-3 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory("전체")}
          className={`px-3 py-1.5 rounded-[6px] text-xs font-mono transition-all ${
            selectedCategory === "전체"
              ? "bg-[#171717] text-white"
              : "bg-transparent text-[#666666] hover:text-[#171717] hover:bg-[#ffffff] border border-[#ebebeb]"
          }`}
        >
          ALL ({posts.length})
        </button>
        <button
          onClick={() => setSelectedCategory("행사")}
          className={`px-3 py-1.5 rounded-[6px] text-xs font-mono transition-all ${
            selectedCategory === "행사"
              ? "bg-[#171717] text-white"
              : "bg-transparent text-[#666666] hover:text-[#171717] hover:bg-[#ffffff] border border-[#ebebeb]"
          }`}
        >
          🎪 행사·축제 ({eventCount})
        </button>
        <button
          onClick={() => setSelectedCategory("혜택")}
          className={`px-3 py-1.5 rounded-[6px] text-xs font-mono transition-all ${
            selectedCategory === "혜택"
              ? "bg-[#171717] text-white"
              : "bg-transparent text-[#666666] hover:text-[#171717] hover:bg-[#ffffff] border border-[#ebebeb]"
          }`}
        >
          🎁 지원금·혜택 ({benefitCount})
        </button>
      </div>

      {/* 필터링된 포스트 목록 */}
      {filteredPosts.length === 0 ? (
        <div className="bg-[#ffffff] rounded-[6px] border border-[#ebebeb] p-12 text-center space-y-3">
          <span className="font-mono text-xs text-[#8f8f8f]">▲ NO MATCHING POSTS</span>
          <p className="text-xs sm:text-sm text-[#666666]">
            해당 카테고리의 글이 없습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post) => (
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
    </div>
  );
}

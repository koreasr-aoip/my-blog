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
      {/* 카테고리 필터 탭 (Notion Style Pills) */}
      <div className="flex items-center gap-2 border-b border-black/[0.08] pb-3.5 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory("전체")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            selectedCategory === "전체"
              ? "bg-[#0075de] text-white shadow-2xs"
              : "bg-white text-[#615d59] hover:bg-[#eeebe8] border border-black/[0.08]"
          }`}
        >
          전체 보기 ({posts.length})
        </button>
        <button
          onClick={() => setSelectedCategory("행사")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            selectedCategory === "행사"
              ? "bg-[#0075de] text-white shadow-2xs"
              : "bg-white text-[#615d59] hover:bg-[#eeebe8] border border-black/[0.08]"
          }`}
        >
          🎪 축제·행사 ({eventCount})
        </button>
        <button
          onClick={() => setSelectedCategory("혜택")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            selectedCategory === "혜택"
              ? "bg-[#0075de] text-white shadow-2xs"
              : "bg-white text-[#615d59] hover:bg-[#eeebe8] border border-black/[0.08]"
          }`}
        >
          🎁 지원금·혜택 ({benefitCount})
        </button>
      </div>

      {/* 필터링된 포스트 목록 */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-[12px] border border-black/[0.08] p-12 text-center space-y-3">
          <span className="text-3xl block">📝</span>
          <p className="text-sm text-[#757575]">
            해당 카테고리의 글이 없습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-[12px] border border-black/[0.08] p-5 sm:p-6 transition-all hover:border-black/20 hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#0075de] bg-[#e6f3fe] px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <time className="text-xs text-[#757575]">
                    {post.date}
                  </time>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-base sm:text-lg font-bold text-[#111111] hover:text-[#0075de] transition-colors tracking-tight mb-2"
                >
                  {post.title}
                </Link>

                <p className="text-xs sm:text-sm text-[#615d59] line-clamp-2 leading-relaxed mb-4">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#757575]">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#f6f5f4] border border-black/[0.06] text-[#615d59] rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#0075de] hover:underline"
                >
                  글 읽기 →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

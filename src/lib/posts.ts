import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  content: string;
}

// date 필드가 Date 객체인 경우 YYYY-MM-DD 문자열로 변환 처리
function formatDate(dateValue: unknown): string {
  if (dateValue instanceof Date) {
    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, "0");
    const day = String(dateValue.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  if (typeof dateValue === "string") {
    return dateValue;
  }
  return "";
}

// 모든 블로그 글 가져오기 (날짜 최신순 정렬)
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith(".md"));

  const posts = mdFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const tags = Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
      ? data.tags.split(",").map((t: string) => t.trim())
      : [];

    return {
      slug,
      title: data.title || slug,
      date: formatDate(data.date),
      summary: data.summary || "",
      category: data.category || "일반",
      tags,
      content,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 특정 슬러그의 블로그 글 가져오기
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const tags = Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
      ? data.tags.split(",").map((t: string) => t.trim())
      : [];

    return {
      slug,
      title: data.title || slug,
      date: formatDate(data.date),
      summary: data.summary || "",
      category: data.category || "일반",
      tags,
      content,
    };
  } catch {
    return null;
  }
}

const fs = require("fs");
const path = require("path");

async function main() {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.error("GEMINI_API_KEY 환경변수가 설정되지 않았습니다.");
    process.exit(1);
  }

  // 경로 설정 (상위/하위 모두 안전하게 탐색)
  let localInfoPath = path.join(__dirname, "../public/data/local-info.json");
  let postsDir = path.join(__dirname, "../src/content/posts");

  if (!fs.existsSync(localInfoPath)) {
    localInfoPath = path.join(__dirname, "../my-blog/public/data/local-info.json");
    postsDir = path.join(__dirname, "../my-blog/src/content/posts");
  }

  if (!fs.existsSync(localInfoPath)) {
    console.error("local-info.json 파일을 찾을 수 없습니다.");
    process.exit(1);
  }

  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  // [1단계] 최신 데이터 확인
  const rawLocalInfo = fs.readFileSync(localInfoPath, "utf8");
  let localData;
  try {
    localData = JSON.parse(rawLocalInfo);
  } catch (err) {
    console.error("local-info.json 파싱 실패:", err.message);
    process.exit(1);
  }

  const items = localData.items || [];
  if (items.length === 0) {
    console.log("local-info.json에 데이터가 없습니다.");
    process.exit(0);
  }

  const latestItem = items[items.length - 1];
  const targetName = (latestItem.name || latestItem.title || "").trim();

  // 기존 posts 파일들과 비교
  const existingFiles = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  for (const file of existingFiles) {
    const content = fs.readFileSync(path.join(postsDir, file), "utf8");
    if (targetName && content.includes(targetName)) {
      console.log("이미 작성된 글입니다");
      process.exit(0);
    }
  }

  // [2단계] Gemini AI로 블로그 글 생성
  const today = new Date().toISOString().split("T")[0];
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`;

  const prompt = `아래 공공서비스 정보를 바탕으로 블로그 글을 작성해줘.
정보: ${JSON.stringify(latestItem, null, 2)}
아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: ${today}
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, 태그3]
---
(본문: 800자 이상, 친근한 블로그 톤, 추천 이유 3가지 포함, 신청 방법 안내)

마지막 줄에 FILENAME: ${today}-keyword 형식으로 파일명도 출력해줘. 키워드는 영문으로.`;

  let responseText = "";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API 호출 실패: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (err) {
    console.error("Gemini AI 글 생성 중 오류 발생:", err.message);
    process.exit(1);
  }

  if (!responseText) {
    console.error("Gemini로부터 받은 응답이 비어 있습니다.");
    process.exit(1);
  }

  // [3단계] 파일 저장 및 FILENAME 분리
  // 마크다운 코드블록 제거
  let cleanText = responseText.replace(/^```markdown\s*/i, "").replace(/^```\s*/, "").replace(/\s*```$/, "").trim();

  // FILENAME 파싱
  const filenameMatch = cleanText.match(/FILENAME:\s*([^\r\n]+)/i);
  let filename = "";

  if (filenameMatch) {
    filename = filenameMatch[1].trim();
    // 본문에서 FILENAME 라인 제거
    cleanText = cleanText.replace(/FILENAME:\s*[^\r\n]+/gi, "").trim();
  }

  if (!filename) {
    const sanitizedTitle = (latestItem.name || latestItem.title || "service")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 20);
    filename = `${today}-${sanitizedTitle || "post"}`;
  }

  if (!filename.endsWith(".md")) {
    filename = `${filename}.md`;
  }

  // 중복 파일명 방지
  let finalPath = path.join(postsDir, filename);
  let counter = 1;
  const baseName = filename.replace(/\.md$/, "");
  while (fs.existsSync(finalPath)) {
    filename = `${baseName}-${counter}.md`;
    finalPath = path.join(postsDir, filename);
    counter++;
  }

  try {
    fs.writeFileSync(finalPath, cleanText, "utf8");
    console.log(`블로그 글 생성 완료: ${filename}`);
  } catch (err) {
    console.error("파일 저장 실패:", err.message);
    process.exit(1);
  }
}

main();

const fs = require("fs");
const path = require("path");

async function main() {
  const publicDataKey = process.env.PUBLIC_DATA_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!publicDataKey) {
    console.error("PUBLIC_DATA_API_KEY 환경변수가 설정되지 않았습니다.");
    process.exit(1);
  }
  if (!geminiKey) {
    console.error("GEMINI_API_KEY 환경변수가 설정되지 않았습니다.");
    process.exit(1);
  }

  // local-info.json 경로 탐색
  const localInfoPath = path.join(__dirname, "../public/data/local-info.json");
  if (!fs.existsSync(localInfoPath)) {
    console.error("local-info.json 파일을 찾을 수 없습니다.");
    process.exit(1);
  }

  const rawLocalInfo = fs.readFileSync(localInfoPath, "utf8");
  let localData;
  try {
    localData = JSON.parse(rawLocalInfo);
  } catch (err) {
    console.error("기존 local-info.json 파싱 실패:", err.message);
    process.exit(1);
  }

  // [1단계] 공공데이터포털 API에서 데이터 가져오기
  const endpoint = "https://api.odcloud.kr/api/gov24/v3/serviceList";
  const url = `${endpoint}?page=1&perPage=20&returnType=JSON&serviceKey=${encodeURIComponent(
    publicDataKey
  )}`;

  let apiItems = [];
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`공공데이터 API 호출 실패: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    apiItems = json.data || json.items || [];
  } catch (err) {
    console.error("데이터 가져오기 에러:", err.message);
    process.exit(1);
  }

  if (!Array.isArray(apiItems) || apiItems.length === 0) {
    console.log("가져온 공공데이터가 비어 있습니다.");
    process.exit(0);
  }

  // 필터링 순서: 성남 -> 경기 -> 전체
  const checkField = (item, keyword) => {
    const text = `${item.서비스명 || ""} ${item.서비스목적요약 || ""} ${
      item.지원대상 || ""
    } ${item.소관기관명 || ""}`;
    return text.includes(keyword);
  };

  let filtered = apiItems.filter((item) => checkField(item, "성남"));
  if (filtered.length === 0) {
    filtered = apiItems.filter((item) => checkField(item, "경기"));
  }
  if (filtered.length === 0) {
    filtered = apiItems;
  }

  // [2단계] 기존 데이터와 비교
  const existingNames = new Set(
    (localData.items || []).map((i) => (i.name || i.title || "").trim())
  );

  const newCandidate = filtered.find((item) => {
    const serviceName = (item.서비스명 || "").trim();
    return serviceName && !existingNames.has(serviceName);
  });

  if (!newCandidate) {
    console.log("새로운 데이터가 없습니다");
    process.exit(0);
  }

  // [3단계] Gemini AI로 새 항목 1개만 가공
  const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
  const prompt = `아래 공공데이터 1건을 분석해서 JSON 객체로 변환해줘. 형식:
{id: 숫자, name: 서비스명, category: '행사' 또는 '혜택', startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', location: 장소 또는 기관명, target: 지원대상, summary: 한줄요약, link: 상세 URL}
category는 내용을 보고 행사/축제면 '행사', 지원금/서비스면 '혜택'으로 판단해.
startDate가 없으면 오늘 날짜, endDate가 없으면 '상시'로 넣어.
반드시 JSON 객체만 출력해. 다른 텍스트 없이.

공공데이터:
${JSON.stringify(newCandidate, null, 2)}`;

  let processedItem;
  try {
    const geminiRes = await fetch(geminiEndpoint, {
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

    if (!geminiRes.ok) {
      throw new Error(
        `Gemini API 호출 실패: ${geminiRes.status} ${geminiRes.statusText}`
      );
    }

    const geminiData = await geminiRes.json();
    const candidateText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // JSON 부분만 파싱 (마크다운 코드블록 제거)
    const cleaned = candidateText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    processedItem = JSON.parse(cleaned);
  } catch (err) {
    console.error(
      "Gemini AI 가공 중 오류 발생 (기존 local-info.json 유지):",
      err.message
    );
    process.exit(1);
  }

  // [4단계] 기존 데이터에 추가
  if (processedItem) {
    // title/name 필드 상호 호환성 확보
    if (!processedItem.title && processedItem.name) {
      processedItem.title = processedItem.name;
    }
    if (!processedItem.name && processedItem.title) {
      processedItem.name = processedItem.title;
    }
    if (!processedItem.id) {
      processedItem.id = Date.now();
    }

    localData.items = localData.items || [];
    localData.items.push(processedItem);

    const today = new Date().toISOString().split("T")[0];
    localData.updatedAt = today;

    fs.writeFileSync(localInfoPath, JSON.stringify(localData, null, 2), "utf8");
    console.log(
      `새로운 항목 추가 완료: ${processedItem.name || processedItem.title}`
    );
  }
}

main();

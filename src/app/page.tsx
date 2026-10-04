import Link from "next/link";
import localData from "../../public/data/local-info.json";
import AdBanner from "@/components/AdBanner";

interface InfoItem {
  id: string;
  slug?: string;
  title: string;
  category: "행사" | "혜택";
  startDate: string;
  endDate: string;
  time?: string;
  fee?: string;
  location: string;
  parking?: string;
  host?: string;
  inquiry?: string;
  target: string;
  tags?: string[];
  summary: string;
  link: string;
}

// 날짜에서 '월'과 '일'을 추출하는 도우미 함수
function parseDate(dateStr: string) {
  const parts = dateStr.split("-");
  if (parts.length >= 3) {
    return {
      month: parseInt(parts[1], 10),
      day: parseInt(parts[2], 10),
    };
  }
  return { month: 0, day: 0 };
}

// 기준일(2026-10-04) 대비 D-Day 계산 도우미 함수
function getDDay(startDateStr: string, endDateStr: string) {
  const today = new Date("2026-10-04T00:00:00+09:00");
  const start = new Date(`${startDateStr}T00:00:00+09:00`);
  const end = new Date(`${endDateStr}T23:59:59+09:00`);

  if (today > end) {
    return { label: "종료", bg: "bg-black/5 text-[#757575]" };
  }
  if (today >= start && today <= end) {
    return { label: "진행 중", bg: "bg-[#e6f3fe] text-[#0075de]" };
  }
  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { label: `D-${diffDays}`, bg: "bg-[#ffb110]/20 text-[#111111]" };
}

export default function Home() {
  const allItems = localData.items as InfoItem[];
  const events = allItems.filter((i) => i.category === "행사");
  const benefits = allItems.filter((i) => i.category === "혜택");

  return (
    <div className="min-h-screen bg-[#f6f5f4] text-[#111111]">
      {/* 1. 상단 글로벌 네비게이션 바 (Notion Top Nav) */}
      <header className="sticky top-0 z-50 bg-[#f6f5f4]/85 backdrop-blur-md border-b border-black/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* 좌측: 노션 스타일 아이콘 + 워드마크 */}
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
            <span className="hidden sm:inline-block text-[12px] px-2 py-0.5 rounded-full bg-black/5 text-[#757575] font-medium">
              남양주
            </span>
          </Link>

          {/* 우측 네비게이션 링크 */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#111111] bg-white border border-black/[0.08] rounded-[8px] shadow-2xs"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#757575] hover:text-[#111111] hover:bg-black/5 rounded-[8px] transition-all"
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

      {/* 2. 히어로 섹션 (Notion Warm Paper Hero) */}
      <section className="border-b border-black/[0.08] bg-[#f6f5f4] pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            {/* 노션 시그니처 뱃지 */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/[0.08] rounded-full text-xs font-medium text-[#615d59] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0075de] animate-pulse"></span>
              <span>남양주시 생활 밀착형 정보 수첩</span>
              <span className="text-black/20">|</span>
              <span className="text-[#0075de] font-semibold">실시간 업데이트</span>
            </div>

            {/* 메인 헤드라인 (하이라이트 필 포함) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.15]">
              남양주시 정보,
              <br />
              한 권의{" "}
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#ffb110]/25 text-[#111111] border border-[#ffb110]/40">
                생활 수첩
              </span>
              으로..
            </h1>

            {/* 서브 카피 */}
            <p className="text-sm sm:text-base text-[#615d59] leading-relaxed max-w-2xl font-normal">
              이번 주말 떠나기 좋은 가을 축제 일정부터 놓치기 아쉬운 청년·출산 지원금까지,
              복잡한 행정 공고를 읽기 쉬운 노트로 정리해 드립니다.
            </p>

            {/* 노션 스타일 액션 버튼 (Primary Blue + Sky Tint Ghost) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#events-section"
                className="inline-flex items-center justify-center bg-[#0075de] hover:bg-[#0062bd] text-white px-4 py-2.5 rounded-[8px] text-xs sm:text-sm font-medium transition-colors shadow-2xs"
              >
                🎪 이번 달 행사 보러가기 ({events.length})
              </a>
              <a
                href="#benefits-section"
                className="inline-flex items-center justify-center bg-[#e6f3fe] hover:bg-[#d8ecfd] text-[#0075de] px-4 py-2.5 rounded-[8px] text-xs sm:text-sm font-medium transition-colors"
              >
                🎁 지원금 혜택 목록 ({benefits.length}) →
              </a>
            </div>

            {/* 노션 콜아웃 스타일 상태 박스 */}
            <div className="pt-3">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-white border border-black/[0.08] rounded-[10px] text-xs text-[#615d59] shadow-2xs">
                <span>📌</span>
                <span>마지막 동기화: <strong>{localData.updatedAt}</strong></span>
                <span className="text-black/15">•</span>
                <span className="text-[#0075de] font-medium">대한민국 공공데이터 검증 완료</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 본문 컨테이너 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {/* 행사 & 축제 섹션 */}
        <section id="events-section" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-black/[0.08] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎪</span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                이번 달 행사 & 축제
              </h2>
            </div>
            <div className="text-xs text-[#757575] font-medium">
              현재 <strong className="text-[#0075de] font-semibold">{events.length}건</strong>의 축제가 열리고 있어요
            </div>
          </div>

          <div className="space-y-4">
            {events.map((event) => {
              const start = parseDate(event.startDate);
              const end = parseDate(event.endDate);
              const postUrl = event.slug ? `/blog/${event.slug}` : "/blog";
              const dDay = getDDay(event.startDate, event.endDate);

              const eventSchema = {
                "@context": "https://schema.org",
                "@type": "Event",
                name: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                location: {
                  "@type": "Place",
                  name: event.location,
                },
                description: event.summary,
              };

              return (
                <article
                  key={event.id}
                  className="bg-white rounded-[12px] border border-black/[0.08] p-5 sm:p-6 transition-all hover:border-black/20 hover:shadow-xs flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch"
                >
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(eventSchema),
                    }}
                  />

                  {/* 좌측: 노션 캘린더 타일 */}
                  <Link
                    href={postUrl}
                    className="sm:w-32 shrink-0 bg-[#f6f5f4] hover:bg-[#eeebe8] border border-black/[0.06] rounded-[10px] p-3 flex sm:flex-col items-center justify-between sm:justify-center text-center transition-colors group"
                  >
                    <span className="text-xs font-semibold text-[#0075de] tracking-tight">
                      {start.month}월
                    </span>
                    <div className="flex sm:flex-col items-baseline sm:items-center">
                      <span className="text-3xl sm:text-4xl font-black text-[#111111] leading-tight group-hover:text-[#0075de] transition-colors">
                        {start.day}
                      </span>
                      {event.startDate !== event.endDate && (
                        <span className="text-xs text-[#757575] font-medium">
                          ~ {end.month !== start.month ? `${end.month}/` : ""}{end.day}일
                        </span>
                      )}
                    </div>
                    <span className={`mt-1.5 px-2 py-0.5 rounded-full text-[12px] font-semibold ${dDay.bg}`}>
                      {dDay.label}
                    </span>
                  </Link>

                  {/* 우측: 상세 정보 */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* 상단 뱃지 및 태그 칩 */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                        <span className="text-xs font-semibold text-[#0075de] bg-[#e6f3fe] px-2 py-0.5 rounded-full">
                          {event.category}
                        </span>
                        {event.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-[#615d59] bg-[#f6f5f4] border border-black/[0.06] px-2 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* 제목 */}
                      <Link
                        href={postUrl}
                        className="text-lg sm:text-xl font-bold text-[#111111] hover:text-[#0075de] transition-colors tracking-tight"
                      >
                        {event.title}
                      </Link>

                      {/* 요약문 */}
                      <p className="text-sm text-[#615d59] leading-relaxed mt-2">
                        {event.summary}
                      </p>

                      {/* 노션 콜아웃 스타일 메타데이터 패널 */}
                      <div className="mt-4 p-3 bg-[#f6f5f4] border border-black/[0.06] rounded-[8px] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#615d59]">
                        <div className="flex items-start gap-2">
                          <span className="text-[#757575] font-medium shrink-0">⏰ 시간:</span>
                          <span className="text-[#111111]">{event.time || "주간 운영"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#757575] font-medium shrink-0">🎫 비용:</span>
                          <span className="text-[#0075de] font-semibold">{event.fee || "무료"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#757575] font-medium shrink-0">📍 장소:</span>
                          <span className="text-[#111111]">{event.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#757575] font-medium shrink-0">🚗 주차:</span>
                          <span className="text-[#111111]">{event.parking || "인근 공영주차장"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#757575] font-medium shrink-0">👥 대상:</span>
                          <span className="text-[#111111]">{event.target}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#757575] font-medium shrink-0">📞 문의:</span>
                          <span className="text-[#111111]">{event.inquiry || event.host || "남양주시청"}</span>
                        </div>
                      </div>
                    </div>

                    {/* 하단 링크 버튼 */}
                    <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between gap-3 text-xs">
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#757575] hover:text-[#0075de] transition-colors"
                      >
                        <span>공식 기관 누리집</span>
                        <span aria-hidden="true">↗</span>
                      </a>

                      <Link
                        href={postUrl}
                        className="inline-flex items-center justify-center bg-[#0075de] hover:bg-[#0062bd] text-white px-3.5 py-1.5 rounded-[8px] text-xs font-medium transition-colors"
                      >
                        자세히 읽기 →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 광고 배너 */}
        <div className="my-8">
          <AdBanner />
        </div>

        {/* 지원금 & 복지 혜택 섹션 */}
        <section id="benefits-section" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-black/[0.08] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
                지원금 & 복지 혜택
              </h2>
            </div>
            <div className="text-xs text-[#757575] font-medium">
              신청 가능한 복지 정책 총 <strong className="text-[#0075de] font-semibold">{benefits.length}건</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => {
              const postUrl = benefit.slug ? `/blog/${benefit.slug}` : "/blog";

              const benefitSchema = {
                "@context": "https://schema.org",
                "@type": "GovernmentService",
                name: benefit.title,
                description: benefit.summary,
                provider: {
                  "@type": "GovernmentOrganization",
                  name: benefit.location || "남양주시",
                },
              };

              return (
                <article
                  key={benefit.id}
                  className="bg-white rounded-[12px] border border-black/[0.08] p-5 sm:p-6 transition-all hover:border-black/20 hover:shadow-xs flex flex-col justify-between"
                >
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(benefitSchema),
                    }}
                  />

                  <div>
                    {/* 상단 뱃지 */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#0075de] bg-[#e6f3fe] px-2 py-0.5 rounded-full">
                          {benefit.category}
                        </span>
                        {benefit.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-[#615d59] bg-[#f6f5f4] border border-black/[0.06] px-2 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-[#757575]">
                        상시 접수
                      </span>
                    </div>

                    {/* 제목 */}
                    <Link
                      href={postUrl}
                      className="block text-base sm:text-lg font-bold text-[#111111] hover:text-[#0075de] transition-colors tracking-tight mb-2"
                    >
                      {benefit.title}
                    </Link>

                    {/* 노션 하이라이트 콜아웃 (지원 대상) */}
                    <Link
                      href={postUrl}
                      className="block p-3 bg-[#fff9e6] hover:bg-[#fff4d1] border border-[#ffb110]/30 rounded-[8px] mb-3 transition-colors group"
                    >
                      <div className="text-[12px] font-bold text-[#b18164] flex items-center gap-1 mb-1">
                        <span>🎯</span>
                        <span>지원 대상</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#111111] leading-snug group-hover:text-[#0075de]">
                        {benefit.target}
                      </p>
                    </Link>

                    {/* 요약 */}
                    <p className="text-xs sm:text-sm text-[#615d59] leading-relaxed mb-3">
                      {benefit.summary}
                    </p>

                    {/* 메타데이터 */}
                    <div className="p-2.5 bg-[#f6f5f4] border border-black/[0.06] rounded-[8px] space-y-1 text-xs text-[#615d59] mb-4">
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#757575]">접수:</span>
                        <span className="text-[#111111]">{benefit.time || "평일 09:00~18:00"}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-[#757575]">문의:</span>
                        <span className="text-[#111111]">{benefit.inquiry || "관할 행정복지센터"}</span>
                      </div>
                    </div>
                  </div>

                  {/* 하단 링크 */}
                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs">
                    <a
                      href={benefit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#757575] hover:text-[#0075de] transition-colors"
                    >
                      <span>공식 접수처</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <Link
                      href={postUrl}
                      className="inline-flex items-center justify-center bg-[#e6f3fe] hover:bg-[#d8ecfd] text-[#0075de] px-3 py-1.5 rounded-[8px] text-xs font-medium transition-colors"
                    >
                      신청 가이드 보기 →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* 4. 하단 푸터 (Notion Warm Footer) */}
      <footer className="mt-20 border-t border-black/[0.08] bg-[#f6f5f4] py-12 text-xs text-[#757575]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-base">📖</span>
              <span className="text-[#111111] font-semibold">
                우리 동네 소식통
              </span>
              <span className="text-black/20">/</span>
              <span>남양주시 생활 정보 수첩</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#615d59]">
              <Link href="/" className="hover:text-[#0075de] transition-colors">홈</Link>
              <Link href="/blog" className="hover:text-[#0075de] transition-colors">블로그</Link>
              <Link href="/about" className="hover:text-[#0075de] transition-colors">서비스 소개</Link>
              <Link href="/privacy" className="hover:text-[#0075de] transition-colors">개인정보처리방침</Link>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] text-[#757575]">
            <p>
              데이터 출처: 공공데이터포털(data.go.kr) | 최종 업데이트: {localData.updatedAt}
            </p>
            <p>본 사이트의 정보는 공공누리 제1유형에 따라 자유롭게 배포됩니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

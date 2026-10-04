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
    return { label: "종료", color: "text-[#8f8f8f]" };
  }
  if (today >= start && today <= end) {
    return { label: "진행 중", color: "text-[#297a3a]" };
  }
  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return { label: `D-${diffDays}`, color: "text-[#171717]" };
}

export default function Home() {
  const allItems = localData.items as InfoItem[];
  const events = allItems.filter((i) => i.category === "행사");
  const benefits = allItems.filter((i) => i.category === "혜택");

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
              className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#171717] bg-[#ffffff] border border-[#ebebeb] rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#666666] hover:text-[#171717] hover:bg-[#ffffff] rounded-[6px] transition-all"
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

      {/* 2. 히어로 섹션 */}
      <section className="border-b border-[#ebebeb] bg-[#fafafa] pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
              <span className="text-black">▲</span>
              <span>LOCAL DISPATCH & CITIZEN HUB</span>
              <span className="text-[#ebebeb]">|</span>
              <span className="text-[#297a3a] flex items-center gap-1 font-mono">
                <span>✓</span> LIVE FEED
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.04em] text-[#171717] leading-[1.08]">
              남양주시민을 위한
              <br />
              <span className="text-[#171717] font-medium">생활 밀착 정보 허브</span>
            </h1>

            <p className="text-sm sm:text-base text-[#4d4d4d] leading-relaxed max-w-2xl">
              남양주시의 실시간 공식 축제·문화 행사 일정과 놓치지 말아야 할
              청년·출산 지원금 및 복지 혜택을 매일 가장 정확하게 정리해 전해드립니다.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#events-section"
                className="inline-flex items-center justify-center bg-[#171717] text-white hover:bg-black px-4 py-2 rounded-[6px] text-xs sm:text-sm font-normal transition-colors"
              >
                이번 달 행사 ({events.length}) ↓
              </a>
              <a
                href="#benefits-section"
                className="inline-flex items-center justify-center bg-transparent text-[#4d4d4d] border border-[#ebebeb] hover:text-[#171717] hover:border-[#171717] hover:bg-white px-4 py-2 rounded-[6px] text-xs sm:text-sm font-normal transition-colors"
              >
                지원금 혜택 ({benefits.length}) →
              </a>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-[#ffffff] border border-[#ebebeb] rounded-[6px] font-mono text-[11px] text-[#666666]">
                <span className="text-[#171717]">▲ UPDATED:</span>
                <span className="text-[#171717]">{localData.updatedAt}</span>
                <span className="text-[#ebebeb]">/</span>
                <span className="text-[#297a3a] flex items-center gap-1">
                  <span>✓</span> VERIFIED OFFICIAL DATA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 본문 컨테이너 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* 행사 & 축제 섹션 */}
        <section id="events-section" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-[#ebebeb] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-black text-xs">▲</span>
              <h2 className="text-xl sm:text-2xl font-normal tracking-[-0.03em] text-[#171717]">
                이번 달 행사 & 축제
              </h2>
            </div>
            <div className="font-mono text-[11px] text-[#8f8f8f] tracking-wide uppercase">
              COUNT: <span className="text-[#171717] font-semibold">{events.length}</span> EVENTS ACTIVE
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
                  className="bg-[#ffffff] rounded-[6px] border border-[#ebebeb] p-5 sm:p-6 transition-all hover:border-[#c9c9c9] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch"
                >
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(eventSchema),
                    }}
                  />

                  {/* 좌측: 모노스페이스 날짜 및 D-Day 패널 */}
                  <Link
                    href={postUrl}
                    className="sm:w-32 shrink-0 bg-[#fafafa] hover:bg-[#f2f2f2] border border-[#ebebeb] rounded-[6px] p-3 flex sm:flex-col items-center justify-between sm:justify-center text-center transition-colors group"
                  >
                    <span className="font-mono text-[11px] font-medium tracking-wider text-[#666666] uppercase">
                      {start.month}월
                    </span>
                    <div className="flex sm:flex-col items-baseline sm:items-center">
                      <span className="font-mono text-3xl font-normal text-[#171717] leading-tight group-hover:underline">
                        {start.day}
                      </span>
                      {event.startDate !== event.endDate && (
                        <span className="font-mono text-[11px] text-[#8f8f8f]">
                          ~ {end.month !== start.month ? `${end.month}/` : ""}{end.day}일
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px]">
                      <span className="text-[#297a3a] font-semibold">{dDay.label}</span>
                      <span className="text-[#ebebeb]">|</span>
                      <span className="text-[#666666]">진행예정</span>
                    </div>
                  </Link>

                  {/* 우측: 상세 정보 및 확장 메타데이터 */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* 상단 뱃지 및 태그 칩 */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span className="font-mono text-[10px] tracking-wider uppercase text-[#297a3a] bg-[#fafafa] border border-[#ebebeb] px-1.5 py-0.5 rounded-[4px]">
                          ✓ {event.category}
                        </span>
                        {event.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] text-[#666666] bg-[#fafafa] border border-[#ebebeb] px-1.5 py-0.5 rounded-[4px]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* 제목 */}
                      <Link
                        href={postUrl}
                        className="text-base sm:text-xl font-medium text-[#171717] hover:underline underline-offset-4 tracking-tight"
                      >
                        {event.title}
                      </Link>

                      {/* 개요 요약 */}
                      <p className="text-sm text-[#4d4d4d] leading-relaxed mt-2">
                        {event.summary}
                      </p>

                      {/* 확장 상세 메타데이터 그리드 (시간, 비용, 주차, 문의처, 장소, 대상) */}
                      <div className="mt-4 p-3.5 bg-[#fafafa] border border-[#ebebeb] rounded-[6px] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <div className="flex items-start gap-2">
                          <span className="text-[#8f8f8f] shrink-0">TIME:</span>
                          <span className="text-[#171717] font-sans">{event.time || "주간 운영"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#8f8f8f] shrink-0">FEE:</span>
                          <span className="text-[#297a3a] font-sans font-medium">{event.fee || "무료"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#8f8f8f] shrink-0">LOC:</span>
                          <span className="text-[#171717] font-sans">{event.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#8f8f8f] shrink-0">PARK:</span>
                          <span className="text-[#4d4d4d] font-sans">{event.parking || "인근 공영주차장"}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#8f8f8f] shrink-0">FOR:</span>
                          <span className="text-[#4d4d4d] font-sans">{event.target}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[#8f8f8f] shrink-0">CONTACT:</span>
                          <span className="text-[#4d4d4d] font-sans">{event.inquiry || event.host || "남양주시청"}</span>
                        </div>
                      </div>
                    </div>

                    {/* 하단 액션 버튼 */}
                    <div className="mt-4 pt-3 border-t border-[#ebebeb] flex items-center justify-between gap-3 text-xs">
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-[#666666] hover:text-[#171717] transition-colors"
                      >
                        <span>공식 기관 누리집</span>
                        <span aria-hidden="true">↗</span>
                      </a>

                      <Link
                        href={postUrl}
                        className="inline-flex items-center justify-center bg-[#171717] text-white hover:bg-black px-3.5 py-1.5 rounded-[6px] text-xs font-normal transition-colors"
                      >
                        상세 안내글 읽기 →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 광고 배너 컴포넌트 */}
        <div className="my-8">
          <AdBanner />
        </div>

        {/* 지원금 & 복지 혜택 섹션 */}
        <section id="benefits-section" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-[#ebebeb] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-black text-xs">▲</span>
              <h2 className="text-xl sm:text-2xl font-normal tracking-[-0.03em] text-[#171717]">
                지원금 & 복지 혜택
              </h2>
            </div>
            <div className="font-mono text-[11px] text-[#8f8f8f] tracking-wide uppercase">
              COUNT: <span className="text-[#171717] font-semibold">{benefits.length}</span> AVAILABLE
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
                  className="bg-[#ffffff] rounded-[6px] border border-[#ebebeb] p-5 sm:p-6 transition-all hover:border-[#c9c9c9] hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between"
                >
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(benefitSchema),
                    }}
                  />

                  <div>
                    {/* 상단 뱃지 및 태그 */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] tracking-wider uppercase text-[#297a3a] bg-[#fafafa] border border-[#ebebeb] px-1.5 py-0.5 rounded-[4px]">
                          ✓ {benefit.category}
                        </span>
                        {benefit.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] text-[#666666] bg-[#fafafa] border border-[#ebebeb] px-1.5 py-0.5 rounded-[4px]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-[11px] text-[#8f8f8f]">
                        상시 접수
                      </span>
                    </div>

                    {/* 제목 */}
                    <Link
                      href={postUrl}
                      className="block text-base sm:text-lg font-medium text-[#171717] hover:underline underline-offset-4 tracking-tight mb-2"
                    >
                      {benefit.title}
                    </Link>

                    {/* 대상자 박스 */}
                    <Link
                      href={postUrl}
                      className="block p-3 bg-[#fafafa] hover:bg-[#f2f2f2] border border-[#ebebeb] rounded-[6px] mb-3 transition-colors group"
                    >
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#666666] mb-1">
                        ELIGIBILITY / 지원 대상
                      </div>
                      <p className="text-xs sm:text-sm text-[#171717] leading-snug group-hover:underline">
                        {benefit.target}
                      </p>
                    </Link>

                    {/* 상세 요약 */}
                    <p className="text-xs sm:text-sm text-[#4d4d4d] leading-relaxed mb-4">
                      {benefit.summary}
                    </p>

                    {/* 혜택 상세 메타데이터 */}
                    <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px] space-y-1 text-xs font-mono mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-[#8f8f8f] shrink-0">HOURS:</span>
                        <span className="text-[#171717] font-sans">{benefit.time || "평일 09:00 ~ 18:00"}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#8f8f8f] shrink-0">CONTACT:</span>
                        <span className="text-[#171717] font-sans">{benefit.inquiry || "관할 행정복지센터"}</span>
                      </div>
                    </div>
                  </div>

                  {/* 하단 링크 */}
                  <div className="pt-3 border-t border-[#ebebeb] flex items-center justify-between text-xs">
                    <a
                      href={benefit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#666666] hover:text-[#171717] transition-colors"
                    >
                      <span>공식 접수처</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <Link
                      href={postUrl}
                      className="inline-flex items-center justify-center bg-[#171717] text-white hover:bg-black px-3 py-1.5 rounded-[6px] text-xs font-normal transition-colors"
                    >
                      상세 신청 안내 →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* 4. 하단 푸터 */}
      <footer className="mt-20 border-t border-[#ebebeb] bg-[#fafafa] py-12 text-xs text-[#666666]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ebebeb] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-black text-xs">▲</span>
              <span className="font-mono text-xs text-[#171717] tracking-wider uppercase font-medium">
                우리 동네 소식통
              </span>
              <span className="text-[#c9c9c9]">/</span>
              <span className="text-[#8f8f8f] font-mono text-[11px]">NAMYANGJU OPEN DATA</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#666666]">
              <Link href="/" className="hover:text-[#171717] transition-colors">홈</Link>
              <Link href="/blog" className="hover:text-[#171717] transition-colors">블로그</Link>
              <Link href="/about" className="hover:text-[#171717] transition-colors">서비스 소개</Link>
              <Link href="/privacy" className="hover:text-[#171717] transition-colors">개인정보처리방침</Link>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] text-[#8f8f8f]">
            <p>
              SOURCE: DATA.GO.KR (공공데이터포털) | LAST SYNC: {localData.updatedAt}
            </p>
            <p>본 사이트의 정보는 공공누리 제1유형에 따라 자유롭게 배포됩니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

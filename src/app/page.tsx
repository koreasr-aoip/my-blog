import Link from "next/link";
import localData from "../../public/data/local-info.json";
import AdBanner from "@/components/AdBanner";

interface InfoItem {
  id: string;
  title: string;
  category: "행사" | "혜택";
  startDate: string;
  endDate: string;
  location: string;
  target: string;
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

export default function Home() {
  const allItems = localData.items as InfoItem[];
  const events = allItems.filter((i) => i.category === "행사");
  const benefits = allItems.filter((i) => i.category === "혜택");

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#222222]">
      {/* 1. 맨 위 큰 배너: 하늘색 배경에 "우리 동네 소식통" 큰 글씨 */}
      <header className="bg-sky-500 text-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-12 sm:pb-16 text-center">
          {/* 상단 네비게이션 바 */}
          <nav className="flex items-center justify-between pb-6 mb-8 border-b border-sky-400/50 text-sm">
            <Link href="/" className="flex items-center gap-1.5 font-bold hover:text-sky-100 transition-colors">
              <span>🏙️</span>
              <span className="font-extrabold tracking-tight">우리 동네 소식통</span>
            </Link>
            <div className="flex items-center gap-2 font-semibold">
              <Link href="/" className="px-3 py-1 rounded-lg bg-white/20 text-white">
                홈
              </Link>
              <Link href="/blog" className="px-3 py-1 rounded-lg bg-white text-sky-600 hover:bg-sky-50 shadow-xs transition-colors">
                📝 블로그
              </Link>
              <Link href="/about" className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors">
                소개
              </Link>
            </div>
          </nav>

          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-3">
            남양주시 생활 밀착 정보
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-xs">
            우리 동네 소식통
          </h1>
          <p className="mt-3 sm:mt-4 text-sky-100 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
            남양주시민이 꼭 챙겨야 할 알짜배기 축제 소식과 지원금 혜택을 전해드립니다.
          </p>

          {/* 간편 이동 버튼 */}
          <div className="mt-6 flex justify-center gap-3 text-xs sm:text-sm font-bold">
            <a
              href="#events-section"
              className="px-4 py-2 bg-white text-sky-600 rounded-full shadow-xs hover:bg-sky-50 transition-colors"
            >
              🎪 행사·축제 보러가기 ({events.length}건)
            </a>
            <a
              href="#benefits-section"
              className="px-4 py-2 bg-sky-600 text-white border border-white/40 rounded-full hover:bg-sky-700 transition-colors"
            >
              🎁 지원금 혜택 보러가기 ({benefits.length}건)
            </a>
          </div>
        </div>
      </header>

      {/* 2. 본문 컨테이너 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* 행사 & 축제 섹션 */}
        <section id="events-section" className="scroll-mt-6">
          <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-slate-900">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <span className="text-sky-500">🎪</span>
              <span>이번 달 행사 & 축제</span>
            </h2>
            <span className="text-xs text-slate-500">
              총 <strong className="text-sky-600 font-bold">{events.length}</strong>건 진행 중
            </span>
          </div>

          <div className="space-y-4">
            {events.map((event) => {
              const start = parseDate(event.startDate);
              const end = parseDate(event.endDate);

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
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-sky-300 transition-all p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch"
                >
                  {/* Event 구조화 데이터 (JSON-LD) */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(eventSchema),
                    }}
                  />
                  {/* 왼쪽: 날짜(큰 숫자) 카드 영역 */}
                  <Link
                    href="/blog"
                    className="sm:w-28 shrink-0 bg-sky-50 hover:bg-sky-100 border border-sky-100 rounded-lg p-3 flex sm:flex-col items-center justify-between sm:justify-center text-center transition-colors group"
                  >
                    <span className="text-xs font-bold text-sky-700 sm:mb-1">
                      {start.month}월
                    </span>
                    <div className="flex sm:flex-col items-baseline sm:items-center gap-1 sm:gap-0">
                      <span className="text-2xl sm:text-3xl font-black text-sky-600 group-hover:scale-105 transition-transform leading-none">
                        {start.day}
                      </span>
                      {event.startDate !== event.endDate && (
                        <span className="text-xs text-sky-500 font-semibold sm:mt-1">
                          ~ {end.month !== start.month ? `${end.month}/` : ""}{end.day}일
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] bg-sky-200/80 text-sky-800 font-semibold px-2 py-0.5 rounded-full sm:mt-2">
                      진행예정
                    </span>
                  </Link>

                  {/* 오른쪽: 제목, 장소, 대상, 요약 내용 */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                          {event.category}
                        </span>
                        <Link
                          href="/blog"
                          className="text-lg sm:text-xl font-bold text-slate-900 hover:text-sky-600 transition-colors"
                        >
                          {event.title}
                        </Link>
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {event.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-700">📍 장소:</span>
                          <span className="text-slate-800 font-medium">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-700">👥 대상:</span>
                          <span>{event.target}</span>
                        </div>
                      </div>

                      <Link
                        href="/blog"
                        className="self-end sm:self-auto inline-flex items-center gap-1 px-3.5 py-1.5 bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white font-bold rounded-lg transition-colors"
                      >
                        자세히 보기 →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 행사와 혜택 섹션 사이 AdSense 광고 */}
        <AdBanner className="my-6" />

        {/* 지원금 & 혜택 섹션 */}
        <section id="benefits-section" className="scroll-mt-6">
          <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-emerald-600">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <span className="text-emerald-600">🎁</span>
              <span>지원금 & 복지 혜택</span>
            </h2>
            <span className="text-xs text-slate-500">
              총 <strong className="text-emerald-600 font-bold">{benefits.length}</strong>건 접수 가능
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((benefit) => {
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
                  className="bg-white rounded-xl border-2 border-emerald-500 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
                >
                  {/* GovernmentService 구조화 데이터 (JSON-LD) */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(benefitSchema),
                    }}
                  />
                  <div>
                    {/* 상단 뱃지 & 신청 기간 */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {benefit.category}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      기간: {benefit.startDate} ~ {benefit.endDate}
                    </span>
                  </div>

                  {/* 제목 */}
                  <Link
                    href="/blog"
                    className="block text-lg font-bold text-slate-900 hover:text-emerald-600 transition-colors mb-3"
                  >
                    {benefit.title}
                  </Link>

                  {/* 대상자 강조 박스 */}
                  <Link
                    href="/blog"
                    className="block p-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-lg mb-3 transition-colors"
                  >
                    <span className="block text-[11px] font-black text-emerald-800 tracking-wider">
                      🎯 지원 대상 (필독!)
                    </span>
                    <p className="mt-1 text-sm font-bold text-emerald-950 leading-snug">
                      {benefit.target}
                    </p>
                  </Link>

                  {/* 상세 내용 요약 */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {benefit.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500">
                    <span className="font-semibold text-slate-700">접수:</span> {benefit.location}
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs transition-colors"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </article>
            );
          })}
          </div>
        </section>
      </main>

      {/* 하단 푸터 */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <div className="flex flex-wrap justify-center items-center gap-3 font-semibold text-slate-600 mb-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">홈</Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-sky-600 transition-colors">블로그</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-sky-600 transition-colors">서비스 소개</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-sky-600 transition-colors text-slate-700 font-bold">개인정보처리방침</Link>
          </div>
          <p className="font-bold text-slate-700">
            우리 동네 소식통 • 남양주시 생활 정보 포털
          </p>
          <p>데이터 출처: 공공데이터포털(data.go.kr) | 마지막 업데이트: {localData.updatedAt}</p>
          <p className="text-slate-400">본 사이트의 정보는 공공누리 제1유형에 따라 배포됩니다.</p>
        </div>
      </footer>
    </div>
  );
}

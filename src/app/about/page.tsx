import Link from "next/link";

export const metadata = {
  title: "서비스 소개 | 우리 동네 소식통",
  description: "우리 동네 소식통의 운영 목적, 공공데이터 출처 및 투명한 행정 정보 공유 방침을 안내해 드립니다.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6f5f4] text-[#111111]">
      {/* 1. 상단 글로벌 네비게이션 바 */}
      <header className="sticky top-0 z-50 bg-[#f6f5f4]/85 backdrop-blur-md border-b border-black/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
          </Link>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#757575] hover:text-[#111111] hover:bg-black/5 rounded-[8px] transition-all"
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
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#111111] bg-white border border-black/[0.08] rounded-[8px] shadow-2xs"
            >
              소개
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. 헤더 섹션 */}
      <section className="border-b border-black/[0.08] bg-[#f6f5f4] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/[0.08] rounded-full text-xs font-medium text-[#615d59] shadow-2xs">
            <span>🏡</span>
            <span>서비스 소개 (About Us)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] leading-tight">
            우리 동네 소식통 이야기
          </h1>

          <p className="text-sm sm:text-base text-[#615d59] max-w-xl leading-relaxed">
            대한민국 공공데이터포털(data.go.kr)의 신뢰할 수 있는 공식 정보를 바탕으로,
            남양주시민의 일상에 꼭 필요한 복지와 문화 소식을 정성껏 모아드립니다.
          </p>
        </div>
      </section>

      {/* 3. 본문 내용 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-[12px] border border-black/[0.08] p-6 sm:p-10 space-y-10 shadow-2xs">
          {/* 섹션 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#111111] flex items-center gap-2 pb-2 border-b border-black/[0.06]">
              <span>💡</span>
              <span>사이트 운영 목적 (Mission)</span>
            </h2>
            <p className="text-[#4d4d4d] leading-relaxed text-sm sm:text-base">
              <strong>우리 동네 소식통</strong>은 남양주시민 여러분이 지자체의 유용한 복지 혜택과 다채로운 문화 축제를 놓치지 않고 편리하게 누리실 수 있도록 돕는 비영리 정보 공유 포털입니다.
            </p>
            <p className="text-[#615d59] leading-relaxed text-sm">
              매달 열리는 지역 축제 일정은 물론, 청년 기본소득, 월세 지원, 어르신 교통비 지원 등 시민의 삶에 직접적인 도움이 되는 정책들을 이해하기 쉬운 노트 형태로 전달합니다.
            </p>
          </section>

          {/* 섹션 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#111111] flex items-center gap-2 pb-2 border-b border-black/[0.06]">
              <span>🏛️</span>
              <span>데이터 출처 및 투명성 (Transparency)</span>
            </h2>
            <p className="text-[#4d4d4d] leading-relaxed text-sm sm:text-base">
              본 사이트에 게재되는 모든 행정 및 행사 정보는 대한민국 <strong>공공데이터포털(data.go.kr)</strong>의 공공데이터 및 남양주시청 공식 누리집 발표 자료를 기반으로 철저히 검증하여 작성됩니다.
            </p>
            <div className="p-4 rounded-[10px] bg-[#f6f5f4] border border-black/[0.06] text-xs text-[#615d59] space-y-1.5">
              <div className="font-bold text-[#111111] flex items-center gap-1.5">
                <span>✓</span>
                <span>공공누리 제1유형 출처표시 준수</span>
              </div>
              <p className="leading-relaxed">
                각 게시물 하단의 공식 원문 링크를 통해 관할 지자체 담당 부서와 정부24 온라인 접수처로 즉시 연결되어 안심하고 신청하실 수 있습니다.
              </p>
            </div>
          </section>

          {/* 하단 바로가기 버튼 */}
          <div className="pt-6 border-t border-black/[0.06] flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#0075de] hover:bg-[#0062bd] text-white px-4 py-2.5 rounded-[8px] text-xs font-medium transition-colors shadow-2xs"
            >
              홈으로 가기 →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-[#e6f3fe] hover:bg-[#d8ecfd] text-[#0075de] px-4 py-2.5 rounded-[8px] text-xs font-medium transition-colors"
            >
              블로그 글 목록 보기
            </Link>
          </div>
        </div>
      </main>

      {/* 4. 푸터 */}
      <footer className="mt-20 border-t border-black/[0.08] bg-[#f6f5f4] py-12 text-xs text-[#757575]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-base">📖</span>
              <span className="text-[#111111] font-semibold">
                우리 동네 소식통
              </span>
              <span className="text-black/20">/</span>
              <span>서비스 소개</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#615d59]">
              <Link href="/" className="hover:text-[#0075de] transition-colors">홈</Link>
              <Link href="/blog" className="hover:text-[#0075de] transition-colors">블로그</Link>
              <Link href="/about" className="hover:text-[#0075de] transition-colors">서비스 소개</Link>
              <Link href="/privacy" className="hover:text-[#0075de] transition-colors">개인정보처리방침</Link>
            </nav>
          </div>

          <div className="text-[11px] text-[#757575]">
            공공데이터 출처: 공공데이터포털(data.go.kr) | 남양주시
          </div>
        </div>
      </footer>
    </div>
  );
}

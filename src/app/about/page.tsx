import Link from "next/link";

export const metadata = {
  title: "서비스 소개 | 우리 동네 소식통",
  description: "우리 동네 소식통의 운영 목적, 공공데이터 출처 및 AI 기반 콘텐츠 생성 방식을 투명하게 안내해 드립니다.",
};

export default function AboutPage() {
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
              className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#666666] hover:text-[#171717] hover:bg-[#ffffff] rounded-[6px] transition-all"
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
              className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#171717] bg-[#ffffff] border border-[#ebebeb] rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              소개
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. 헤더 섹션 */}
      <section className="border-b border-[#ebebeb] bg-[#fafafa] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
            <span className="text-black">▲</span>
            <span>ABOUT & MISSION STATEMENT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-[#171717] leading-tight">
            서비스 소개
          </h1>

          <p className="text-sm sm:text-base text-[#4d4d4d] max-w-xl leading-relaxed">
            공공데이터포털(data.go.kr)의 신뢰할 수 있는 데이터를 바탕으로 남양주시민을 위한
            핵심 생활 정보를 정갈하게 정리하여 전달합니다.
          </p>
        </div>
      </section>

      {/* 3. 소개 본문 내용 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-[#ffffff] rounded-[6px] border border-[#ebebeb] p-6 sm:p-10 space-y-10">
          {/* 섹션 1: 사이트 운영 목적 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#ebebeb]">
              <span className="text-black text-xs">▲</span>
              <h2 className="text-lg sm:text-xl font-normal tracking-tight text-[#171717]">
                운영 목적 (Mission)
              </h2>
            </div>
            <p className="text-[#4d4d4d] leading-relaxed text-sm sm:text-base">
              <strong className="text-[#171717]">우리 동네 소식통</strong>은 남양주시 주민 여러분을 위해 복잡하고 흩어져 있는 지자체 생활 밀착형 정보를 한곳에 모아 알기 쉽게 제공하는 비영리 공공 정보 아카이브입니다.
            </p>
            <p className="text-[#666666] leading-relaxed text-sm">
              매달 열리는 다채로운 지역 문화 축제와 행사 소식은 물론, 청년 월세 지원금, 출산 지원금 등 실질적인 복지 혜택을 시민 누구나 쉽고 빠르게 찾아볼 수 있도록 돕습니다.
            </p>
          </section>

          {/* 섹션 2: 데이터 출처 및 신뢰성 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#ebebeb]">
              <span className="text-black text-xs">▲</span>
              <h2 className="text-lg sm:text-xl font-normal tracking-tight text-[#171717]">
                데이터 출처 및 투명성 (Data & Transparency)
              </h2>
            </div>
            <p className="text-[#4d4d4d] leading-relaxed text-sm sm:text-base">
              본 서비스의 모든 행정, 복지, 행사 정보는 대한민국 <strong className="text-[#171717]">공공데이터포털(data.go.kr)</strong>의 공식 공공데이터 API 및 지자체 공개 자료를 정기적으로 동기화하여 수집됩니다.
            </p>
            <div className="p-4 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] font-mono text-xs text-[#666666] space-y-1">
              <div className="text-[#171717] font-semibold flex items-center gap-1">
                <span>✓</span> KOGL TYPE-1 LICENSE
              </div>
              <p className="font-sans text-xs text-[#4d4d4d]">
                본 사이트에서 제공하는 공공저작물은 공공누리 제1유형 출처표시 기준을 준수하며, 각 카드 및 글 하단의 링크를 통해 관할 지자체 및 정부24 공식 접수처로 즉시 연결됩니다.
              </p>
            </div>
          </section>

          {/* 섹션 3: 콘텐츠 생성 방식 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#ebebeb]">
              <span className="text-black text-xs">▲</span>
              <h2 className="text-lg sm:text-xl font-normal tracking-tight text-[#171717]">
                콘텐츠 요약 및 안내 (Content Generation)
              </h2>
            </div>
            <p className="text-[#4d4d4d] leading-relaxed text-sm sm:text-base">
              방대하고 난해한 공공 행정 공고문을 시민 여러분이 한눈에 파악하실 수 있도록 생성형 AI 기술을 활용하여 명확하고 친근한 안내문 형태로 요약·제공하고 있습니다.
            </p>
            <p className="text-[#666666] leading-relaxed text-sm">
              모든 콘텐츠는 원본 공공데이터의 정확한 사실관계를 바탕으로 유지 관리되며, 공식 원문 출처를 항상 투명하게 병기하고 있습니다.
            </p>
          </section>

          {/* 하단 바로가기 버튼 */}
          <div className="pt-6 border-t border-[#ebebeb] flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#171717] text-white hover:bg-black px-4 py-2 rounded-[6px] text-xs font-normal transition-colors"
            >
              메인 홈으로 가기 →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-transparent text-[#4d4d4d] border border-[#ebebeb] hover:text-[#171717] hover:border-[#171717] bg-white px-4 py-2 rounded-[6px] text-xs font-normal transition-colors"
            >
              블로그 글 목록
            </Link>
          </div>
        </div>
      </main>

      {/* 4. 푸터 */}
      <footer className="mt-20 border-t border-[#ebebeb] bg-[#fafafa] py-12 text-xs text-[#666666]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ebebeb] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-black text-xs">▲</span>
              <span className="font-mono text-xs text-[#171717] tracking-wider uppercase font-medium">
                우리 동네 소식통
              </span>
              <span className="text-[#c9c9c9]">/</span>
              <span className="text-[#8f8f8f] font-mono text-[11px]">ABOUT</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#666666]">
              <Link href="/" className="hover:text-[#171717] transition-colors">홈</Link>
              <Link href="/blog" className="hover:text-[#171717] transition-colors">블로그</Link>
              <Link href="/about" className="hover:text-[#171717] transition-colors">서비스 소개</Link>
              <Link href="/privacy" className="hover:text-[#171717] transition-colors">개인정보처리방침</Link>
            </nav>
          </div>

          <div className="font-mono text-[11px] text-[#8f8f8f]">
            DATA: DATA.GO.KR (공공데이터포털) | NAMYANGJU CITY
          </div>
        </div>
      </footer>
    </div>
  );
}

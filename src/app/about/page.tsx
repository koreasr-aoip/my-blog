import Link from "next/link";

export const metadata = {
  title: "서비스 소개 | 우리 동네 소식통",
  description: "우리 동네 소식통의 운영 목적, 공공데이터 출처 및 AI 기반 콘텐츠 생성 방식을 투명하게 안내해 드립니다.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#222222]">
      {/* 상단 헤더 */}
      <header className="bg-sky-500 text-white shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-bold hover:text-sky-100 transition-colors"
            >
              <span className="text-xl">🏙️</span>
              <span className="text-xl tracking-tight">우리 동네 소식통</span>
            </Link>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black drop-shadow-xs">
              서비스 소개 (About)
            </h1>
          </div>

          <nav className="flex items-center gap-2 text-sm font-semibold">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              블로그
            </Link>
            <Link
              href="/about"
              className="px-3.5 py-1.5 rounded-lg bg-white text-sky-600 shadow-xs"
            >
              소개
            </Link>
          </nav>
        </div>
      </header>

      {/* 소개 본문 내용 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
          {/* 섹션 1: 사이트 운영 목적 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span>🏡</span>
              <span>사이트 운영 목적</span>
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              <strong>우리 동네 소식통</strong>은 성남시와 경기도 지역 주민들을 위해 복잡하고 흩어져 있는 생활 밀착형 정보를 한곳에 모아 알기 쉽게 제공하는 비영리 정보 공유 포털입니다.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              매달 열리는 다채로운 지역 문화 축제와 행사 소식은 물론, 놓치기 아쉬운 청년 월세 지원금, 출산 지원금 등 실질적인 혜택을 시민 누구나 쉽고 빠르게 찾아볼 수 있도록 돕는 것을 목표로 합니다.
            </p>
          </section>

          {/* 섹션 2: 데이터 출처 및 신뢰성 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span>🏛️</span>
              <span>데이터 출처 및 투명성</span>
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              본 웹사이트의 모든 행정, 복지, 행사 정보는 대한민국 <strong>공공데이터포털(data.go.kr)</strong>의 공식 정부24 서비스 목록 API 및 지자체 공공데이터를 기반으로 수집됩니다.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-1.5">
              <div className="font-bold text-slate-800">📋 공공누리 제1유형 출처표시 적용</div>
              <p>
                본 사이트에서 제공하는 공공저작물은 출처표시 기준을 준수하며, 각 정보 하단의 공식 원문 링크를 통해 관할 행정복지센터 및 정부24 공식 접수처로 바로 연결됩니다.
              </p>
            </div>
          </section>

          {/* 섹션 3: 콘텐츠 생성 방식 (AI 활용 안내) */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span>🤖</span>
              <span>콘텐츠 생성 방식 (AI 활용)</span>
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              어렵고 딱딱한 공공 행정 공고문을 지역 주민들이 편안하게 읽으실 수 있도록 최신 <strong>생성형 AI(Google Gemini)</strong>를 활용하여 친근한 블로그 글 형태로 알기 쉽게 요약·정리하고 있습니다.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              AI가 작성한 모든 글은 원본 공공데이터의 사실관계를 바탕으로 하며, 각 글 하단에 AI 생성 사실과 공식 원문 출처를 투명하게 공개하고 있습니다.
            </p>
          </section>

          {/* 하단 바로가기 버튼 */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-xs transition-colors"
            >
              홈으로 가기 →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              블로그 글 읽기
            </Link>
          </div>
        </article>
      </main>

      {/* 푸터 */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500 text-center">
        <p className="font-semibold text-slate-700">우리 동네 소식통</p>
        <p className="mt-1">데이터 출처: 공공데이터포털(data.go.kr) | 성남시</p>
      </footer>
    </div>
  );
}

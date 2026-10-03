import Link from "next/link";
import { notFound } from "next/navigation";
import localData from "../../../../public/data/local-info.json";

interface InfoItem {
  id: string;
  title: string;
  category: "행사" | "혜택";
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  description?: string;
  link: string;
}

// Cloudflare Pages 정적 내보내기(export)를 위한 사전 경로 생성
export function generateStaticParams() {
  return (localData.items as InfoItem[]).map((item) => ({
    id: item.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InfoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = (localData.items as InfoItem[]).find((i) => i.id === id);

  if (!item) {
    notFound();
  }

  const isEvent = item.category === "행사";

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#222222]">
      {/* 상단 미니 헤더 배너 (메인 페이지와 톤앤매너 일치) */}
      <header className="bg-sky-500 text-white shadow-xs">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white font-bold hover:text-sky-100 transition-colors"
          >
            <span className="text-xl">🏙️</span>
            <span className="text-lg tracking-tight">우리 동네 소식통</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold transition-all"
          >
            ← 메인 목록으로
          </Link>
        </div>
      </header>

      {/* 상세 내용 본문 카드 (네이버 블로그 스타일의 깔끔한 가독성) */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* 상단 타이틀 영역 */}
          <div
            className={`p-6 sm:p-8 border-b ${
              isEvent
                ? "border-sky-100 bg-sky-50/40"
                : "border-emerald-100 bg-emerald-50/40"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isEvent
                    ? "bg-sky-500 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {item.category === "행사" ? "🎪 문화 행사·축제" : "🎁 복지 지원금"}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                등록일: {localData.updatedAt}
              </span>
            </div>

            {/* 1. 행사/혜택 이름 (크게) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              {item.title}
            </h1>

            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {item.summary}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* 2. 핵심 정보 박스 (기간, 장소, 대상) */}
            <section className="bg-slate-50 rounded-xl border border-slate-200/80 p-5 space-y-3.5 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-700 w-20 shrink-0 flex items-center gap-1.5">
                  📅 기간
                </span>
                <span className="font-semibold text-slate-900">
                  {item.startDate === item.endDate
                    ? item.startDate
                    : `${item.startDate} ~ ${item.endDate}`}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-700 w-20 shrink-0 flex items-center gap-1.5">
                  📍 {isEvent ? "장소" : "접수처"}
                </span>
                <span className="text-slate-800">{item.location}</span>
              </div>

              <div className="flex items-start gap-3 pt-1 border-t border-slate-200/60">
                <span className="font-bold text-slate-700 w-20 shrink-0 flex items-center gap-1.5">
                  👥 지원 대상
                </span>
                <span className="font-bold text-sky-800 bg-sky-100/60 px-2 py-0.5 rounded text-sm sm:text-base">
                  {item.target}
                </span>
              </div>
            </section>

            {/* 3. 상세 설명 전문 */}
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 pb-2 mb-4 border-b border-slate-200 flex items-center gap-2">
                <span>📝 상세 안내 내용</span>
              </h2>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3">
                {item.description || item.summary}
              </div>
            </section>

            {/* 유의사항 안내 박스 */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 leading-relaxed">
              💡 <strong>안내사항</strong>: 신청 기간 및 세부 운영 방침은 해당 기관 사정에 따라 변동될 수 있습니다. 자세한 문의는 아래 공식 사이트를 통해 확인하시기 바랍니다.
            </div>

            {/* 4. 버튼 영역: 원본 사이트 링크 + 목록으로 돌아가기 */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* 목록으로 돌아가기 버튼 */}
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold text-sm transition-all"
              >
                ← 목록으로 돌아가기
              </Link>

              {/* 원본 사이트 링크 버튼 */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-md transition-all ${
                  isEvent
                    ? "bg-sky-500 hover:bg-sky-600 shadow-sky-500/20"
                    : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                }`}
              >
                공식 사이트에서 자세히 보기 →
              </a>
            </div>
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

import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 및 구글 애드센스 규정 준수 | 우리 동네 소식통",
  description:
    "우리 동네 소식통의 개인정보 수집·이용, 쿠키 정책 및 Google AdSense 제3자 광고 사업자 규정 준수(맞춤설정 광고 해제 안내, aboutads.info 링크 포함)에 관한 방침입니다.",
};

export default function PrivacyPage() {
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
              개인정보처리방침 (Privacy Policy)
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
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              소개
            </Link>
            <Link
              href="/privacy"
              className="px-3.5 py-1.5 rounded-lg bg-white text-sky-600 shadow-xs"
            >
              개인정보처리방침
            </Link>
          </nav>
        </div>
      </header>

      {/* 메인 본문 컨테이너 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        {/* 상단 안내 배너 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-md border border-sky-200">
            Privacy Policy & Ad Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            개인정보처리방침
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            ‘우리 동네 소식통’(이하 ‘서비스’)은 이용자의 개인정보를 매우 소중하게 생각하며,
            대한민국의 「개인정보 보호법」 및{" "}
            <strong className="text-slate-800">
              구글 애드센스(Google AdSense) 게시자 정책
            </strong>
            {" "}등 관련 국내외 법령과 규정을 철저히 준수합니다.
          </p>
        </div>

        {/* 1. 수집하는 개인정보 항목 및 방법 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span>📌</span>
            <span>1. 수집하는 개인정보 항목 및 방법</span>
          </h3>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              본 웹사이트는 별도의 회원가입이나 로그인 절차 없이 누구나 자유롭게 모든 공공 정보와 혜택 글을 무료로 열람할 수 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-slate-700">
              <li>
                <strong>자동 수집 정보:</strong> 이용자의 웹 브라우저 종류 및 OS 버전, 방문 일시, 접속 IP 주소, 리퍼러(방문 전 이전 페이지 주소), 서비스 이용 기록 등이 웹 서버 로그 및 분석 도구를 통해 자동으로 생성되어 수집될 수 있습니다.
              </li>
              <li>
                <strong>이용자 직접 문의 시:</strong> 이메일 등을 통해 문의나 정보 정정 요청을 접수하실 경우, 원활한 답변 회신을 위해 성함(또는 닉네임)과 이메일 주소를 수집합니다.
              </li>
            </ul>
          </div>
        </section>

        {/* 2. 구글 애드센스 및 제3자 광고 규정 준수 고지 (애드센스 승인 필수 항목) */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-sky-300 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-sky-100">
            <span className="text-2xl">📢</span>
            <h3 className="text-lg sm:text-xl font-bold text-sky-950">
              2. 구글 애드센스(Google AdSense) 및 제3자 광고 사업자 규정 준수 고지
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            본 사이트는 지속 가능하고 양질의 무료 공공정보 서비스를 제공하기 위해 구글(Google LLC)을 포함한 제3자 공급업체의 온라인 광고 게재 서비스를 이용합니다. 이와 관련하여 구글 애드센스 게시자 필수 정책에 따라 다음 사항을 명확히 공지합니다.
          </p>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 bg-sky-50/50 p-5 sm:p-6 rounded-xl border border-sky-100">
            <div className="flex items-start gap-2.5">
              <span className="text-sky-600 font-bold">1)</span>
              <p>
                <strong>쿠키(Cookie)를 통한 광고 게재:</strong> Google을 비롯한 제3자 공급업체는 이용자가 본 웹사이트 또는 인터넷의 다른 웹사이트를 과거에 방문했던 기록을 바탕으로 광고를 게재하기 위해 <strong>쿠키(Cookie)</strong>를 사용합니다.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-sky-600 font-bold">2)</span>
              <p>
                <strong>광고 쿠키의 활용 범위:</strong> Google의 광고 쿠키 사용으로 인해 Google 및 그 파트너사는 이용자의 본 사이트 및/또는 기타 인터넷 사이트 방문 기록을 바탕으로 가장 적절하고 관심사에 부합하는 <strong>맞춤형 광고</strong>를 게재할 수 있습니다.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-sky-600 font-bold">3)</span>
              <div className="space-y-2 w-full">
                <p>
                  <strong>맞춤설정 광고 선택 해제(Opt-out) 권리:</strong> 이용자는 언제든지 맞춤설정 광고 게재에 사용되는 쿠키를 선택 해제(거부)할 권리가 있으며, 아래 공식 링크를 통해 간편하게 비활성화하실 수 있습니다.
                </p>
                <div className="p-3.5 bg-white rounded-xl border border-sky-200 space-y-1.5 text-xs text-slate-700">
                  <p>
                    • <strong>구글 맞춤형 광고 설정 해제:</strong>{" "}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 font-bold underline hover:text-sky-800"
                    >
                      adssettings.google.com
                    </a>{" "}
                    또는{" "}
                    <a
                      href="https://myadcenter.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 font-bold underline hover:text-sky-800"
                    >
                      myadcenter.google.com
                    </a>
                  </p>
                  <p>
                    • <strong>제3자 공급업체 맞춤 광고 쿠키 통합 해제 (AboutAds):</strong>{" "}
                    <a
                      href="https://www.aboutads.info/choices"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 font-bold underline hover:text-sky-800"
                    >
                      www.aboutads.info/choices
                    </a>{" "}
                    (또는{" "}
                    <a
                      href="https://www.aboutads.info"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 font-bold underline hover:text-sky-800"
                    >
                      www.aboutads.info
                    </a>
                    )
                  </p>
                  <p>
                    • <strong>네트워크 광고 이니셔티브(NAI) 선택 해제:</strong>{" "}
                    <a
                      href="https://optout.networkadvertising.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 font-bold underline hover:text-sky-800"
                    >
                      optout.networkadvertising.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 구글 애널리틱스 분석 안내 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span>📊</span>
            <span>3. 구글 애널리틱스(Google Analytics) 등 웹로그 분석 안내</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            본 사이트는 서비스의 품질 개선, 유용한 콘텐츠 기획 및 방문자 이용 패턴 분석을 위해 Google의 웹 로그 분석 도구인 구글 애널리틱스(Google Analytics)를 사용할 수 있습니다.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            이 분석 도구는 익명화된 트래픽 통계(페이지 체류 시간, 유입 경로, 인기 게시글 순위 등)만을 기록하며, 방문자의 성명, 주민등록번호, 연락처 등 고유한 개인을 식별할 수 있는 민감 정보는 일체 수집하거나 저장하지 않습니다.
          </p>
        </section>

        {/* 4. 브라우저 쿠키 거부 및 삭제 방법 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span>⚙️</span>
            <span>4. 브라우저 쿠키(Cookie) 거부 및 삭제 방법</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 사용하시는 웹 브라우저의 옵션을 조정하여 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">Google Chrome</strong>
              <span className="text-slate-500">
                설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용 기록 삭제 또는 서드 파티 쿠키 차단
              </span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">Microsoft Edge</strong>
              <span className="text-slate-500">
                설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터 관리 및 삭제
              </span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">Apple Safari</strong>
              <span className="text-slate-500">
                환경설정 &gt; 개인정보 보호 &gt; 모든 쿠키 차단 또는 웹사이트 데이터 관리
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            * 단, 쿠키 설치를 전면 거부할 경우 일부 사이트 맞춤형 편의 기능 이용에 제약이 있을 수 있습니다.
          </p>
        </section>

        {/* 5. 개인정보 보유 기간 및 파기 절차 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span>🗑️</span>
            <span>5. 개인정보의 보유 기간 및 파기 절차</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 이용자가 문의 메일 등을 통해 제공한 정보는 상담 및 처리 완료 후 지체 없이 영구 삭제됩니다.
          </p>
        </section>

        {/* 6. 개인정보 보호책임자 및 의견 수렴 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span>🛡️</span>
            <span>6. 개인정보 보호책임자 및 의견 수렴</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            서비스 이용 중 발생하는 개인정보 보호 관련 민원, 질의, 정정 요구는 아래의 관리 책임 부서로 연락해 주시면 신속하게 확인하여 성실히 처리해 드리겠습니다.
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 text-xs sm:text-sm text-slate-700 space-y-1.5">
            <p>
              <strong>관리 책임:</strong> 우리 동네 소식통 운영지원팀
            </p>
            <p>
              <strong>공식 문의:</strong> 사이트 내 제보 및 고객 문의 창구
            </p>
            <p>
              <strong>운영 시간:</strong> 평일 10:00 ~ 18:00 (주말 및 공휴일 휴무)
            </p>
          </div>
        </section>

        {/* 하단 고지일자 */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <span>공고 일자: 2026년 10월 1일 | 최종 개정 일자: 2026년 10월 3일</span>
          <div className="flex items-center gap-3 font-medium text-slate-500">
            <Link href="/" className="hover:text-sky-600">
              홈으로 가기
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-sky-600">
              서비스 소개
            </Link>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500 text-center space-y-2">
        <p className="font-semibold text-slate-700">우리 동네 소식통</p>
        <p className="text-slate-400">
          본 사이트는 구글 애드센스 게시자 운영 정책 및 개인정보 보호 규정을 철저히 준수합니다.
        </p>
      </footer>
    </div>
  );
}

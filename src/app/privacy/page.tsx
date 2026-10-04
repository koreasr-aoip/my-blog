import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 및 구글 애드센스 규정 준수 | 우리 동네 소식통",
  description:
    "우리 동네 소식통의 개인정보 수집·이용, 쿠키 정책 및 Google AdSense 제3자 광고 사업자 규정 준수(맞춤설정 광고 해제 안내, aboutads.info 링크 포함)에 관한 방침입니다.",
};

export default function PrivacyPage() {
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
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#757575] hover:text-[#111111] hover:bg-black/5 rounded-[8px] transition-all"
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
            <span>🛡️</span>
            <span>개인정보보호 및 광고 운영 정책</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] leading-tight">
            개인정보처리방침
          </h1>

          <p className="text-sm sm:text-base text-[#615d59] max-w-2xl leading-relaxed">
            ‘우리 동네 소식통’은 이용자의 개인정보를 소중하게 보호하며,
            대한민국 「개인정보 보호법」 및 구글 애드센스(Google AdSense) 게시자 정책을 철저히 준수합니다.
          </p>
        </div>
      </section>

      {/* 3. 본문 컨테이너 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        {/* 1. 수집하는 개인정보 항목 및 방법 */}
        <section className="bg-white p-6 sm:p-8 rounded-[12px] border border-black/[0.08] space-y-4 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#111111] flex items-center gap-2 pb-2 border-b border-black/[0.06]">
            <span>📌</span>
            <span>1. 수집하는 개인정보 항목 및 수집 방법</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-[#4d4d4d] leading-relaxed">
            <p>
              본 웹사이트는 별도의 회원가입이나 로그인 절차 없이 누구나 자유롭게 모든 공공 정보와 혜택 글을 무료로 열람할 수 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#615d59]">
              <li>
                <strong className="text-[#111111]">자동 수집 정보:</strong> 웹 브라우저 종류, 운영체제, 방문 일시, 접속 IP 주소, 서비스 이용 기록 등이 통계 분석 도구를 통해 자동으로 생성·수집될 수 있습니다.
              </li>
              <li>
                <strong className="text-[#111111]">문의 접수 시:</strong> 이메일 등을 통해 문의나 정보 정정을 요청하실 경우 원활한 상담 회신을 위해 성함(닉네임)과 이메일 주소를 수집합니다.
              </li>
            </ul>
          </div>
        </section>

        {/* 2. 구글 애드센스 및 제3자 광고 규정 준수 고지 */}
        <section className="bg-white p-6 sm:p-8 rounded-[12px] border border-black/[0.08] space-y-5 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.06]">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#111111] flex items-center gap-2">
              <span>📢</span>
              <span>2. 구글 애드센스(Google AdSense) 및 제3자 광고 규정 준수 고지</span>
            </h2>
            <span className="text-xs font-semibold text-[#0075de] bg-[#e6f3fe] px-2 py-0.5 rounded-full">
              규정 준수
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#4d4d4d] leading-relaxed">
            본 사이트는 지속 가능하고 유용한 공공정보 서비스를 제공하기 위해 Google을 포함한 제3자 공급업체의 온라인 광고 게재 서비스를 이용합니다. 구글 애드센스 필수 정책에 따라 다음 사항을 명확히 공지합니다.
          </p>

          <div className="space-y-3.5 text-xs sm:text-sm text-[#4d4d4d] bg-[#f6f5f4] p-5 rounded-[10px] border border-black/[0.06]">
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#0075de]">1.</span>
              <p>
                <strong className="text-[#111111]">쿠키(Cookie)를 통한 광고 게재:</strong> Google 및 파트너사는 이용자가 본 웹사이트 또는 인터넷의 다른 웹사이트를 과거에 방문했던 기록을 바탕으로 광고를 게재하기 위해 쿠키를 사용합니다.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold text-[#0075de]">2.</span>
              <p>
                <strong className="text-[#111111]">광고 쿠키의 활용:</strong> Google의 광고 쿠키 사용으로 인해 Google 및 그 파트너사는 이용자의 방문 기록을 바탕으로 관심사에 부합하는 맞춤형 광고를 제공할 수 있습니다.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-bold text-[#0075de]">3.</span>
              <div className="space-y-2 w-full">
                <p>
                  <strong className="text-[#111111]">맞춤설정 광고 선택 해제(Opt-out):</strong> 이용자는 언제든지 맞춤설정 광고 게재에 사용되는 쿠키를 선택 해제(거부)할 권리가 있으며, 아래 공식 링크를 통해 간편하게 비활성화하실 수 있습니다.
                </p>
                <div className="p-3 bg-white rounded-[8px] border border-black/[0.08] space-y-1 text-xs text-[#615d59]">
                  <p>
                    • <strong className="text-[#111111]">구글 광고 설정 센터:</strong>{" "}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0075de] underline"
                    >
                      adssettings.google.com
                    </a>{" "}
                    또는{" "}
                    <a
                      href="https://myadcenter.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0075de] underline"
                    >
                      myadcenter.google.com
                    </a>
                  </p>
                  <p>
                    • <strong className="text-[#111111]">제3자 공급업체 맞춤 광고 통합 해제 (AboutAds):</strong>{" "}
                    <a
                      href="https://www.aboutads.info/choices"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0075de] underline"
                    >
                      www.aboutads.info/choices
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 브라우저 쿠키 거부 방법 */}
        <section className="bg-white p-6 sm:p-8 rounded-[12px] border border-black/[0.08] space-y-4 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#111111] flex items-center gap-2 pb-2 border-b border-black/[0.06]">
            <span>⚙️</span>
            <span>3. 브라우저 쿠키(Cookie) 거부 및 삭제 설정</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#4d4d4d] leading-relaxed">
            이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 브라우저 설정을 통해 언제든지 저장을 거부하실 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#f6f5f4] rounded-[8px] border border-black/[0.06]">
              <strong className="text-[#111111] block mb-1">CHROME</strong>
              <span className="text-[#615d59]">
                설정 &gt; 개인정보 보호 및 보안 &gt; 서드파티 쿠키 차단
              </span>
            </div>
            <div className="p-3 bg-[#f6f5f4] rounded-[8px] border border-black/[0.06]">
              <strong className="text-[#111111] block mb-1">EDGE</strong>
              <span className="text-[#615d59]">
                설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 데이터 관리 및 삭제
              </span>
            </div>
            <div className="p-3 bg-[#f6f5f4] rounded-[8px] border border-black/[0.06]">
              <strong className="text-[#111111] block mb-1">SAFARI</strong>
              <span className="text-[#615d59]">
                환경설정 &gt; 개인정보 보호 &gt; 모든 쿠키 차단
              </span>
            </div>
          </div>
        </section>

        {/* 하단 고지일자 */}
        <div className="pt-4 border-t border-black/[0.08] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#757575]">
          <span>공고 일자: 2026-10-01 | 최종 개정 일자: 2026-10-04</span>
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-[#0075de]">
              홈으로 가기
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-[#0075de]">
              서비스 소개
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
              <span>개인정보처리방침</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#615d59]">
              <Link href="/" className="hover:text-[#0075de] transition-colors">홈</Link>
              <Link href="/blog" className="hover:text-[#0075de] transition-colors">블로그</Link>
              <Link href="/about" className="hover:text-[#0075de] transition-colors">서비스 소개</Link>
              <Link href="/privacy" className="hover:text-[#0075de] transition-colors">개인정보처리방침</Link>
            </nav>
          </div>

          <div className="text-[11px] text-[#757575]">
            본 사이트는 구글 애드센스 게시자 운영 정책 및 개인정보 보호 규정을 철저히 준수합니다.
          </div>
        </div>
      </footer>
    </div>
  );
}

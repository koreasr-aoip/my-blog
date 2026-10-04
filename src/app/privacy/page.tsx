import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 및 구글 애드센스 규정 준수 | 우리 동네 소식통",
  description:
    "우리 동네 소식통의 개인정보 수집·이용, 쿠키 정책 및 Google AdSense 제3자 광고 사업자 규정 준수(맞춤설정 광고 해제 안내, aboutads.info 링크 포함)에 관한 방침입니다.",
};

export default function PrivacyPage() {
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
              className="px-3 py-1.5 text-xs sm:text-sm font-normal text-[#666666] hover:text-[#171717] hover:bg-[#ffffff] rounded-[6px] transition-all"
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
            <span>LEGAL & COMPLIANCE</span>
            <span className="text-[#ebebeb]">/</span>
            <span className="text-[#297a3a] font-mono">GOOGLE ADSENSE POLICY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal tracking-[-0.04em] text-[#171717] leading-tight">
            개인정보처리방침
          </h1>

          <p className="text-sm sm:text-base text-[#4d4d4d] max-w-2xl leading-relaxed">
            ‘우리 동네 소식통’은 이용자의 개인정보를 매우 소중하게 다루며,
            대한민국 「개인정보 보호법」 및 구글 애드센스(Google AdSense) 게시자 정책을 철저히 준수합니다.
          </p>
        </div>
      </section>

      {/* 3. 본문 컨테이너 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* 1. 수집하는 개인정보 항목 및 방법 */}
        <section className="bg-[#ffffff] p-6 sm:p-8 rounded-[6px] border border-[#ebebeb] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#ebebeb]">
            <span className="text-black text-xs">▲</span>
            <h2 className="text-base sm:text-lg font-medium tracking-tight text-[#171717]">
              1. 수집하는 개인정보 항목 및 수집 방법
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-[#4d4d4d] leading-relaxed">
            <p>
              본 웹사이트는 별도의 회원가입이나 로그인 절차 없이 누구나 자유롭게 모든 공공 정보와 혜택 글을 무료로 열람할 수 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-[#666666]">
              <li>
                <strong className="text-[#171717]">자동 수집 정보:</strong> 웹 브라우저 종류, 운영체제, 방문 일시, 접속 IP 주소, 서비스 이용 기록 등이 웹 서버 로그 및 통계 분석 도구를 통해 자동으로 수집될 수 있습니다.
              </li>
              <li>
                <strong className="text-[#171717]">이용자 직접 문의 시:</strong> 이메일 등을 통해 문의나 정보 정정을 요청하실 경우 원활한 상담 회신을 위해 성함(또는 닉네임)과 이메일 주소를 수집합니다.
              </li>
            </ul>
          </div>
        </section>

        {/* 2. 구글 애드센스 및 제3자 광고 규정 준수 고지 */}
        <section className="bg-[#ffffff] p-6 sm:p-8 rounded-[6px] border border-[#ebebeb] space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-[#ebebeb]">
            <div className="flex items-center gap-2">
              <span className="text-black text-xs">▲</span>
              <h2 className="text-base sm:text-lg font-medium tracking-tight text-[#171717]">
                2. 구글 애드센스(Google AdSense) 및 제3자 광고 사업자 규정 준수 고지
              </h2>
            </div>
            <span className="font-mono text-[11px] text-[#297a3a]">✓ COMPLIANT</span>
          </div>

          <p className="text-xs sm:text-sm text-[#4d4d4d] leading-relaxed">
            본 사이트는 지속 가능하고 양질의 무료 공공정보 서비스를 제공하기 위해 Google을 포함한 제3자 공급업체의 온라인 광고 게재 서비스를 이용합니다. 구글 애드센스 필수 게시자 정책에 따라 다음 사항을 투명하게 안내합니다.
          </p>

          <div className="space-y-4 text-xs sm:text-sm text-[#4d4d4d] bg-[#fafafa] p-5 sm:p-6 rounded-[6px] border border-[#ebebeb]">
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[#171717] font-semibold">01.</span>
              <p>
                <strong className="text-[#171717]">쿠키(Cookie)를 통한 광고 게재:</strong> Google을 비롯한 제3자 공급업체는 이용자가 본 웹사이트 또는 인터넷의 다른 웹사이트를 과거에 방문했던 기록을 바탕으로 광고를 게재하기 위해 쿠키를 사용합니다.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[#171717] font-semibold">02.</span>
              <p>
                <strong className="text-[#171717]">광고 쿠키의 활용 범위:</strong> Google의 광고 쿠키 사용으로 인해 Google 및 그 파트너사는 이용자의 방문 기록을 바탕으로 관심사에 부합하는 맞춤형 광고를 게재할 수 있습니다.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[#171717] font-semibold">03.</span>
              <div className="space-y-2 w-full">
                <p>
                  <strong className="text-[#171717]">맞춤설정 광고 선택 해제(Opt-out) 권리:</strong> 이용자는 언제든지 맞춤설정 광고 게재에 사용되는 쿠키를 선택 해제(거부)할 권리가 있으며, 아래 공식 링크를 통해 간편하게 비활성화하실 수 있습니다.
                </p>
                <div className="p-3.5 bg-[#ffffff] rounded-[6px] border border-[#ebebeb] space-y-1.5 font-mono text-xs text-[#666666]">
                  <p>
                    • <strong className="text-[#171717]">구글 광고 설정 센터:</strong>{" "}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#171717] underline hover:text-black"
                    >
                      adssettings.google.com
                    </a>{" "}
                    또는{" "}
                    <a
                      href="https://myadcenter.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#171717] underline hover:text-black"
                    >
                      myadcenter.google.com
                    </a>
                  </p>
                  <p>
                    • <strong className="text-[#171717]">제3자 공급업체 맞춤 광고 쿠키 통합 해제 (AboutAds):</strong>{" "}
                    <a
                      href="https://www.aboutads.info/choices"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#171717] underline hover:text-black"
                    >
                      www.aboutads.info/choices
                    </a>
                  </p>
                  <p>
                    • <strong className="text-[#171717]">네트워크 광고 이니셔티브(NAI) 선택 해제:</strong>{" "}
                    <a
                      href="https://optout.networkadvertising.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#171717] underline hover:text-black"
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
        <section className="bg-[#ffffff] p-6 sm:p-8 rounded-[6px] border border-[#ebebeb] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#ebebeb]">
            <span className="text-black text-xs">▲</span>
            <h2 className="text-base sm:text-lg font-medium tracking-tight text-[#171717]">
              3. 웹로그 분석 도구(Google Analytics) 안내
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4d4d4d] leading-relaxed">
            본 사이트는 서비스의 품질 개선 및 사용자 편의성 제고를 위해 Google 애널리틱스를 활용합니다. 이는 익명화된 트래픽 통계만을 기록하며, 고유한 개인을 식별할 수 있는 민감 정보는 일체 수집하거나 저장하지 않습니다.
          </p>
        </section>

        {/* 4. 브라우저 쿠키 거부 방법 */}
        <section className="bg-[#ffffff] p-6 sm:p-8 rounded-[6px] border border-[#ebebeb] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#ebebeb]">
            <span className="text-black text-xs">▲</span>
            <h2 className="text-base sm:text-lg font-medium tracking-tight text-[#171717]">
              4. 브라우저 쿠키(Cookie) 거부 및 삭제 설정
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4d4d4d] leading-relaxed">
            이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 브라우저 옵션을 통해 언제든지 저장을 거부할 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#fafafa] rounded-[6px] border border-[#ebebeb]">
              <strong className="text-[#171717] block mb-1">CHROME</strong>
              <span className="text-[#666666] font-sans">
                설정 &gt; 개인정보 보호 및 보안 &gt; 인터넷 사용 기록 삭제 또는 서드파티 쿠키 차단
              </span>
            </div>
            <div className="p-3 bg-[#fafafa] rounded-[6px] border border-[#ebebeb]">
              <strong className="text-[#171717] block mb-1">EDGE</strong>
              <span className="text-[#666666] font-sans">
                설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및 사이트 데이터 관리 및 삭제
              </span>
            </div>
            <div className="p-3 bg-[#fafafa] rounded-[6px] border border-[#ebebeb]">
              <strong className="text-[#171717] block mb-1">SAFARI</strong>
              <span className="text-[#666666] font-sans">
                환경설정 &gt; 개인정보 보호 &gt; 모든 쿠키 차단 또는 웹사이트 데이터 관리
              </span>
            </div>
          </div>
        </section>

        {/* 하단 고지일자 */}
        <div className="pt-4 border-t border-[#ebebeb] flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[11px] text-[#8f8f8f]">
          <span>EFFECTIVE DATE: 2026-10-01 | LAST REVISED: 2026-10-04</span>
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-[#171717]">
              홈으로 가기
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-[#171717]">
              서비스 소개
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
              <span className="text-[#8f8f8f] font-mono text-[11px]">PRIVACY POLICY</span>
            </div>

            <nav className="flex flex-wrap items-center gap-4 text-xs font-normal text-[#666666]">
              <Link href="/" className="hover:text-[#171717] transition-colors">홈</Link>
              <Link href="/blog" className="hover:text-[#171717] transition-colors">블로그</Link>
              <Link href="/about" className="hover:text-[#171717] transition-colors">서비스 소개</Link>
              <Link href="/privacy" className="hover:text-[#171717] transition-colors">개인정보처리방침</Link>
            </nav>
          </div>

          <div className="font-mono text-[11px] text-[#8f8f8f]">
            COMPLIANCE: GOOGLE ADSENSE PUBLISHER POLICY & PERSONAL INFORMATION PROTECTION ACT
          </div>
        </div>
      </footer>
    </div>
  );
}

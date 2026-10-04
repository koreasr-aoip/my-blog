"use client";

interface CoupangBannerProps {
  className?: string;
}

export default function CoupangBanner({ className = "" }: CoupangBannerProps) {
  const coupangId = process.env.NEXT_PUBLIC_COUPANG_PARTNER_ID;
  const isCoupangActive = Boolean(
    coupangId && coupangId !== "나중에_입력" && coupangId.trim() !== ""
  );

  if (!isCoupangActive) {
    return null;
  }

  return (
    <div className={`w-full my-6 p-4 rounded-[12px] bg-white border border-black/[0.08] text-center shadow-2xs ${className}`}>
      <div className="flex items-center justify-center gap-1.5 text-xs text-[#111111] font-semibold mb-2.5">
        <span>🛒</span>
        <span>쿠팡 파트너스 추천 혜택 상품 모음</span>
      </div>
      <div className="w-full flex justify-center items-center overflow-hidden rounded-[8px] bg-[#f6f5f4] p-2 border border-black/[0.06]">
        <iframe
          src={`https://ads-partners.coupang.com/widgets.html?id=${coupangId}&template=carousel&trackingCode=${coupangId}`}
          width="100%"
          height="140"
          frameBorder="0"
          scrolling="no"
          referrerPolicy="unsafe-url"
          title="쿠팡 파트너스 배너"
          className="max-w-xl mx-auto"
        />
      </div>
      <p className="mt-2 text-[11px] text-[#757575]">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}

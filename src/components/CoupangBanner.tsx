"use client";

interface CoupangBannerProps {
  className?: string;
}

export default function CoupangBanner({ className = "" }: CoupangBannerProps) {
  const coupangId = process.env.NEXT_PUBLIC_COUPANG_PARTNER_ID;
  const isCoupangActive = Boolean(
    coupangId && coupangId !== "나중에_입력" && coupangId.trim() !== ""
  );

  // 값이 비어있거나 미설정이면 렌더링하지 않음
  if (!isCoupangActive) {
    return null;
  }

  return (
    <div className={`w-full my-6 p-4 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] text-center ${className}`}>
      <div className="flex items-center justify-center gap-1.5 text-xs text-[#171717] font-medium mb-2.5 font-mono">
        <span>▲</span>
        <span>PARTNER RECOMMENDATIONS</span>
      </div>
      <div className="w-full flex justify-center items-center overflow-hidden rounded-[6px] bg-[#ffffff] p-2 border border-[#ebebeb]">
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
      <p className="mt-2 text-[11px] text-[#8f8f8f] font-mono">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}

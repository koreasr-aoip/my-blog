"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdBannerProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isAdSenseActive = Boolean(
    adsenseId && adsenseId !== "나중에_입력" && adsenseId.trim() !== ""
  );

  useEffect(() => {
    if (!isAdSenseActive) return;
    try {
      // @ts-expect-error window.adsbygoogle is injected by external script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [isAdSenseActive]);

  // 미설정 시 빈 영역 없이 깔끔하게 처리
  if (!isAdSenseActive) {
    return null;
  }

  return (
    <div className={`w-full overflow-hidden text-center my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseId}
        data-ad-slot={slot || "1234567890"}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

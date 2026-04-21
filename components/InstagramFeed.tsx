"use client";

import Script from "next/script";

type Props = {
  feedId: string;
  label?: string;
  handle?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": { "feed-id": string; class?: string };
    }
  }
}

export default function InstagramFeed({ feedId, label, handle }: Props) {
  if (!feedId || feedId === "PLACEHOLDER") return null;

  return (
    <div className="w-full">
      {(label || handle) && (
        <div className="flex items-center gap-3 mb-6">
          <span className="w-4 h-px bg-nina-ink/30" />
          {handle && (
            <a
              href={`https://instagram.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.25em] text-nina-ink/50 hover:text-nina-oranje transition-colors"
            >
              @{handle}
            </a>
          )}
          {label && !handle && (
            <span className="text-xs uppercase tracking-[0.25em] text-nina-ink/50">{label}</span>
          )}
        </div>
      )}
      <Script src="https://w.behold.so/widget.js" strategy="lazyOnload" />
      <behold-widget feed-id={feedId} class="w-full" />
    </div>
  );
}

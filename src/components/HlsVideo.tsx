import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    Hls?: {
      isSupported: () => boolean;
      new (): {
        loadSource: (src: string) => void;
        attachMedia: (video: HTMLVideoElement) => void;
        destroy: () => void;
      };
    };
  }
}

let hlsScriptPromise: Promise<void> | null = null;

function loadHlsScript(): Promise<void> {
  if (window.Hls) return Promise.resolve();
  if (!hlsScriptPromise) {
    hlsScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/assets/cdn.jsdelivr.net/npm/hls.js@1.1.4/dist/hls.min.js';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return hlsScriptPromise;
}

export function HlsVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: InstanceType<NonNullable<typeof window.Hls>> | undefined;
    let cancelled = false;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      loadHlsScript().then(() => {
        if (cancelled || !window.Hls?.isSupported()) return;
        hls = new window.Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      });
    }

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
    />
  );
}

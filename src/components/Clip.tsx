import {useEffect, useRef} from 'react';

// A short clip from the engine's showcase pipeline (scripts/showcase.sh in
// the engine repository): a poster, a .webm and an .mp4, all named alike.
// The poster is the lossy 1000 px copy scripts/optimize-images.mjs writes
// rather than the lossless 1920 px screenshot the manual shows: it is a still
// behind a play button, at half those pixels and a third of the bytes.
// An editor clip is 1920×1080, the engine's OFFSCREEN_SIZE; a game's is its
// window size, so a clip that is not says so with `width` and `height`. The
// element carries the size up front so the page does not shift when one loads.
// Nothing downloads until the clip scrolls into view; then it plays, muted,
// and pauses again when it leaves.
const WIDTH = 1920;
const HEIGHT = 1080;

export default function Clip({
  name,
  alt,
  width = WIDTH,
  height = HEIGHT,
}: {
  name: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play()?.catch(() => {});
        else video.pause();
      },
      {threshold: 0.25},
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      width={width}
      height={height}
      loop
      muted
      playsInline
      controls
      preload="none"
      poster={`/img/poster/${name}.webp`}
      aria-label={alt}
      style={{width: '100%', height: 'auto', display: 'block', margin: '1rem 0'}}>
      <source src={`/video/${name}.webm`} type="video/webm" />
      <source src={`/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

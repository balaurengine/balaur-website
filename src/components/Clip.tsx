import {useEffect, useRef} from 'react';

// A short clip from the engine's showcase pipeline (scripts/showcase.sh in
// the engine repository): a poster, a .webm and an .mp4, all named alike.
// Every clip is rendered at 1600×1000, and the element says so up front so
// the page does not shift when one loads. Nothing downloads until the clip
// scrolls into view; then it plays, muted, and pauses again when it leaves.
const WIDTH = 1600;
const HEIGHT = 1000;

export default function Clip({name, alt}: {name: string; alt?: string}) {
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
      width={WIDTH}
      height={HEIGHT}
      loop
      muted
      playsInline
      controls
      preload="none"
      poster={`/img/manual/${name}.webp`}
      aria-label={alt}
      style={{width: '100%', height: 'auto', display: 'block', margin: '1rem 0'}}>
      <source src={`/video/${name}.webm`} type="video/webm" />
      <source src={`/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

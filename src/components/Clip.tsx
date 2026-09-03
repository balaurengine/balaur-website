import React from 'react';

// A short clip from the engine's showcase pipeline (scripts/showcase.sh in
// the engine repository): a poster, a .webm and an .mp4, all named alike.
export default function Clip({name, alt}: {name: string; alt?: string}) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      controls
      poster={`/img/manual/${name}.png`}
      aria-label={alt}
      style={{width: '100%', display: 'block', margin: '1rem 0'}}>
      <source src={`/video/${name}.webm`} type="video/webm" />
      <source src={`/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

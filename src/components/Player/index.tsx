import {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {hasWebGpu, loadEngine, playUrl} from '@site/src/play';
import styles from './styles.module.css';

// One example running over the whole page: the engine booted on its pack, on
// a canvas that fills the viewport — and the screen, when the click that
// opened it may ask for that. The engine runs once per tab, so closing
// reloads the page rather than pretending to stop it.
type Status =
  | {kind: 'loading'; text: string}
  | {kind: 'running'}
  | {kind: 'done'}
  | {kind: 'unsupported'}
  | {kind: 'error'; text: string};

const CANVAS = 'balaur-canvas';

// A second boot would fight the first for the canvas; in development React
// runs a mount effect twice.
let booted = false;

const enterFullscreen = async (el: HTMLElement | null) => {
  try {
    await el?.requestFullscreen?.();
  } catch {
    // A browser that refuses stays inline; the overlay is the whole tab anyway.
  }
};

export default function Player({
  name,
  maximize,
  onClose,
}: {
  name: string;
  /** Ask for fullscreen on open — only from a click, which a browser honours. */
  maximize: boolean;
  onClose: () => void;
}): ReactNode {
  const [status, setStatus] = useState<Status>({kind: 'loading', text: 'Loading the engine…'});
  const [fullscreen, setFullscreen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (maximize) void enterFullscreen(stage.current);
    void (async () => {
      if (!hasWebGpu()) {
        setStatus({kind: 'unsupported'});
        return;
      }
      if (booted) return;
      booted = true;
      try {
        const engine = await loadEngine();
        setStatus({kind: 'running'});
        await engine.start(CANVAS, playUrl(`${name}.bpak`));
        setStatus({kind: 'done'});
      } catch (e) {
        setStatus({kind: 'error', text: e instanceof Error ? e.message : String(e)});
      }
    })();
    return () => {
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fullscreen is the stage alone: the canvas is sized by the page, so it
  // follows, and the engine picks the new size up as a resize. Esc leaves.
  useEffect(() => {
    const sync = () => setFullscreen(document.fullscreenElement === stage.current);
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);
  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await enterFullscreen(stage.current);
    }
    document.getElementById(CANVAS)?.focus();
  };

  const close = () => {
    if (status.kind === 'unsupported') {
      onClose();
      return;
    }
    // Back to the page without `?play=`, which would start the game again.
    window.location.replace(window.location.pathname);
  };

  return (
    <div className={styles.player} role="dialog" aria-label={`examples/${name} running in the browser`}>
      <div className={styles.tools}>
        <span className={styles.name}>examples/{name}</span>
        <span className={styles.hint}>Click the canvas to give it the keyboard.</span>
        <span className={styles.spacer} />
        <Link to={`/editor/?run=${name}`} className={styles.link}>
          Open in the editor →
        </Link>
        <button
          type="button"
          className={styles.button}
          disabled={status.kind !== 'running' && status.kind !== 'done'}
          title="Esc leaves fullscreen"
          onClick={() => void toggleFullscreen()}>
          {fullscreen ? 'Leave fullscreen' : 'Fullscreen'}
        </button>
        <button type="button" className={styles.button} title="Reloads the page: the engine runs once per tab" onClick={close}>
          Close
        </button>
      </div>
      <div className={styles.stage} ref={stage}>
        <canvas id={CANVAS} className={styles.canvas} width={1600} height={1000} tabIndex={0} />
        {status.kind !== 'running' && (
          <div className={styles.overlay}>
            {status.kind === 'loading' && <p>{status.text}</p>}
            {status.kind === 'done' && (
              <div>
                <p>The game quit.</p>
                <button type="button" className="button button--primary" onClick={() => window.location.reload()}>
                  Play again
                </button>
              </div>
            )}
            {status.kind === 'unsupported' && (
              <p>
                This browser has no WebGPU. Chrome, Edge, Safari 26 and Firefox 141 on a desktop have it; the game is
                a few megabytes, so a phone is not the place for it yet.
              </p>
            )}
            {status.kind === 'error' && (
              <p>
                It did not start: <code>{status.text}</code>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

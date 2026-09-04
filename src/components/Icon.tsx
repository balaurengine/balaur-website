import clsx from 'clsx';
import type {ReactNode} from 'react';

// Phosphor Duotone, the set the editor's shell draws (editor/scripts/icons.rn
// in the engine repository). Each icon is inlined by SVGR so it takes its
// colour from the surrounding text, and the tone classes — shared with the
// generated reference, see src/css/custom.css — colour it by what the thing
// belongs to: 2D blue, 3D red, UI green, and so on.
import AppWindow from '@phosphor-icons/core/assets/duotone/app-window-duotone.svg';
import ArrowsClockwise from '@phosphor-icons/core/assets/duotone/arrows-clockwise-duotone.svg';
import Atom from '@phosphor-icons/core/assets/duotone/atom-duotone.svg';
import Bone from '@phosphor-icons/core/assets/duotone/bone-duotone.svg';
import BookOpen from '@phosphor-icons/core/assets/duotone/book-open-duotone.svg';
import Broadcast from '@phosphor-icons/core/assets/duotone/broadcast-duotone.svg';
import Bug from '@phosphor-icons/core/assets/duotone/bug-duotone.svg';
import Cloud from '@phosphor-icons/core/assets/duotone/cloud-duotone.svg';
import Code from '@phosphor-icons/core/assets/duotone/code-duotone.svg';
import Crosshair from '@phosphor-icons/core/assets/duotone/crosshair-duotone.svg';
import Cube from '@phosphor-icons/core/assets/duotone/cube-duotone.svg';
import Cursor from '@phosphor-icons/core/assets/duotone/cursor-duotone.svg';
import Devices from '@phosphor-icons/core/assets/duotone/devices-duotone.svg';
import DownloadSimple from '@phosphor-icons/core/assets/duotone/download-simple-duotone.svg';
import FileText from '@phosphor-icons/core/assets/duotone/file-text-duotone.svg';
import FilmStrip from '@phosphor-icons/core/assets/duotone/film-strip-duotone.svg';
import GameController from '@phosphor-icons/core/assets/duotone/game-controller-duotone.svg';
import Gear from '@phosphor-icons/core/assets/duotone/gear-duotone.svg';
import Globe from '@phosphor-icons/core/assets/duotone/globe-duotone.svg';
import GridFour from '@phosphor-icons/core/assets/duotone/grid-four-duotone.svg';
import Image from '@phosphor-icons/core/assets/duotone/image-duotone.svg';
import Layout from '@phosphor-icons/core/assets/duotone/layout-duotone.svg';
import Lightning from '@phosphor-icons/core/assets/duotone/lightning-duotone.svg';
import Link from '@phosphor-icons/core/assets/duotone/link-duotone.svg';
import MagicWand from '@phosphor-icons/core/assets/duotone/magic-wand-duotone.svg';
import Package from '@phosphor-icons/core/assets/duotone/package-duotone.svg';
import PaintBrush from '@phosphor-icons/core/assets/duotone/paint-brush-duotone.svg';
import Palette from '@phosphor-icons/core/assets/duotone/palette-duotone.svg';
import PersonSimpleRun from '@phosphor-icons/core/assets/duotone/person-simple-run-duotone.svg';
import Play from '@phosphor-icons/core/assets/duotone/play-duotone.svg';
import Plug from '@phosphor-icons/core/assets/duotone/plug-duotone.svg';
import Polygon from '@phosphor-icons/core/assets/duotone/polygon-duotone.svg';
import PuzzlePiece from '@phosphor-icons/core/assets/duotone/puzzle-piece-duotone.svg';
import Record from '@phosphor-icons/core/assets/duotone/record-duotone.svg';
import RocketLaunch from '@phosphor-icons/core/assets/duotone/rocket-launch-duotone.svg';
import Selection from '@phosphor-icons/core/assets/duotone/selection-duotone.svg';
import Shapes from '@phosphor-icons/core/assets/duotone/shapes-duotone.svg';
import ShieldCheck from '@phosphor-icons/core/assets/duotone/shield-check-duotone.svg';
import Sparkle from '@phosphor-icons/core/assets/duotone/sparkle-duotone.svg';
import SpeakerHigh from '@phosphor-icons/core/assets/duotone/speaker-high-duotone.svg';
import Storefront from '@phosphor-icons/core/assets/duotone/storefront-duotone.svg';
import Sun from '@phosphor-icons/core/assets/duotone/sun-duotone.svg';
import Timer from '@phosphor-icons/core/assets/duotone/timer-duotone.svg';
import TreeStructure from '@phosphor-icons/core/assets/duotone/tree-structure-duotone.svg';
import UsersThree from '@phosphor-icons/core/assets/duotone/users-three-duotone.svg';
import VideoCamera from '@phosphor-icons/core/assets/duotone/video-camera-duotone.svg';
import WarningCircle from '@phosphor-icons/core/assets/duotone/warning-circle-duotone.svg';

const ICONS = {
  'app-window': AppWindow,
  'arrows-clockwise': ArrowsClockwise,
  atom: Atom,
  bone: Bone,
  'book-open': BookOpen,
  broadcast: Broadcast,
  bug: Bug,
  cloud: Cloud,
  code: Code,
  crosshair: Crosshair,
  cube: Cube,
  cursor: Cursor,
  devices: Devices,
  'download-simple': DownloadSimple,
  'file-text': FileText,
  'film-strip': FilmStrip,
  'game-controller': GameController,
  gear: Gear,
  globe: Globe,
  'grid-four': GridFour,
  image: Image,
  layout: Layout,
  lightning: Lightning,
  link: Link,
  'magic-wand': MagicWand,
  package: Package,
  'paint-brush': PaintBrush,
  palette: Palette,
  'person-simple-run': PersonSimpleRun,
  play: Play,
  plug: Plug,
  polygon: Polygon,
  'puzzle-piece': PuzzlePiece,
  record: Record,
  'rocket-launch': RocketLaunch,
  selection: Selection,
  shapes: Shapes,
  'shield-check': ShieldCheck,
  sparkle: Sparkle,
  'speaker-high': SpeakerHigh,
  storefront: Storefront,
  sun: Sun,
  timer: Timer,
  'tree-structure': TreeStructure,
  'users-three': UsersThree,
  'video-camera': VideoCamera,
  'warning-circle': WarningCircle,
};

export type IconName = keyof typeof ICONS;
export type Tone = '2d' | '3d' | 'ui' | 'animation' | 'audio' | 'render' | 'physics' | 'other';

export default function Icon({
  name,
  tone = 'other',
  className,
}: {
  name: IconName;
  tone?: Tone;
  className?: string;
}): ReactNode {
  const Svg = ICONS[name];
  return (
    <span className={clsx('ref-icon', `ref-icon--${tone}`, className)} aria-hidden="true">
      <Svg />
    </span>
  );
}

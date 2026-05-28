import { useId } from 'react';
import type {
  ArtifactKind,
  ArtifactVariant,
  ChapterArtifactSpec,
} from '../data/chapterArtifacts';
import { shouldShowArtifactLabel } from '../data/chapterArtifacts';
import {
  Figure,
  GroundShadow,
  PaperCard,
  SceneBackdrop,
  SceneDefs,
} from './artifactCharacters';

type ChapterArtifactProps = {
  kind: ArtifactKind;
  label?: string;
  className?: string;
  variant?: ArtifactVariant;
};

export function ChapterArtifact({
  kind,
  label,
  className = '',
  variant = 'hero',
}: ChapterArtifactProps) {
  const variantClass = variant === 'hero' ? '' : `chapter-artifact--${variant}`;

  return (
    <figure
      aria-hidden={label ? undefined : true}
      className={`chapter-artifact ${variantClass} ${className}`.trim()}
    >
      <div className="chapter-artifact__frame">
        <ArtifactSvg kind={kind} />
      </div>
      {label ? <figcaption className="chapter-artifact__label">{label}</figcaption> : null}
    </figure>
  );
}

type PlacedChapterArtifactProps = {
  spec?: ChapterArtifactSpec;
  variant: ArtifactVariant;
  className?: string;
};

export function PlacedChapterArtifact({ spec, variant, className }: PlacedChapterArtifactProps) {
  if (!spec) {
    return null;
  }

  const showLabel = shouldShowArtifactLabel(spec, variant);

  return (
    <ChapterArtifact
      className={className}
      kind={spec.kind}
      label={showLabel ? spec.label : undefined}
      variant={variant}
    />
  );
}

function ArtifactSvg({ kind }: { kind: ArtifactKind }) {
  switch (kind) {
    case 'couple-bubble-shield':
      return <CoupleBubbleShield />;
    case 'car-dashboard':
      return <CarDashboard />;
    case 'style-manual':
      return <StyleManual />;
    case 'expert-cards':
      return <ExpertCards />;
    case 'door-lamp':
      return <DoorLamp />;
    case 'go-to-tether':
      return <GoToTether />;
    case 'party-thirds':
      return <PartyThirds />;
    case 'same-side-table':
      return <SameSideTable />;
    case 'eye-gaze':
      return <EyeGaze />;
    case 'healing-hands':
      return <HealingHands />;
    default:
      return null;
  }
}


function CoupleBubbleShield() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <SceneBackdrop paperId={`${id}-paper`} />
      <GroundShadow cx={120} cy={152} rx={52} ry={6} />
      <circle
        cx="120"
        cy="88"
        fill="var(--accent-soft)"
        opacity="0.35"
        r="64"
        stroke="var(--accent)"
        strokeDasharray="6 5"
        strokeWidth="1.5"
      />
      <circle cx="120" cy="88" fill="var(--artifact-fill)" opacity="0.5" r="56" />
      <path
        d="M72 52 Q120 28 168 52"
        fill="none"
        stroke="var(--gold)"
        strokeLinecap="round"
        strokeWidth="1"
        opacity="0.45"
      />
      <Figure facing="right" pose="standing-close" variant="partner-a" x={88} y={98} scale={0.82} />
      <Figure facing="left" pose="standing-close" variant="partner-b" x={152} y={96} scale={0.86} />
      <path
        d="M108 72 Q120 62 132 72"
        fill="none"
        stroke="var(--accent-dark)"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <text fill="var(--accent-dark)" fontSize="7" fontWeight="700" letterSpacing="0.06em" textAnchor="middle" x="120" y="48">
        ALLIANCE
      </text>
    </svg>
  );
}

function CarDashboard() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <path
        d="M20 138 Q120 118 220 138 L220 152 Q120 132 20 152 Z"
        fill="var(--artifact-shadow)"
        opacity="0.22"
      />
      <path
        d="M28 128 L212 128 L204 96 L36 96 Z"
        fill="var(--artifact-fill)"
        stroke="var(--artifact-stroke)"
        strokeWidth="1.5"
      />
      <path
        d="M36 96 L204 96 L198 72 L42 72 Z"
        fill="var(--paper-soft)"
        opacity="0.7"
        stroke="var(--artifact-stroke)"
        strokeWidth="1"
      />
      <path
        d="M48 78 Q120 62 192 78"
        fill="none"
        stroke="var(--blueprint)"
        strokeLinecap="round"
        strokeWidth="1"
        opacity="0.35"
      />
      <Figure facing="right" pose="seated-driver" variant="partner-b" x={78} y={108} scale={0.92} />
      <Figure facing="left" pose="seated-passenger" variant="partner-a" x={162} y={110} scale={0.88} />
      <path
        d="M108 92 Q120 84 132 92"
        fill="none"
        stroke="var(--accent)"
        strokeDasharray="3 3"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.65"
      />
      <ellipse cx="120" cy="122" fill="none" rx="22" ry="22" stroke="var(--accent-dark)" strokeWidth="2" />
      <circle cx="120" cy="122" fill="var(--accent-dark)" r="5" />
      <rect
        fill="var(--paper-elevated)"
        height="16"
        rx="2"
        stroke="var(--artifact-stroke)"
        strokeWidth="1.2"
        width="40"
        x="100"
        y="104"
      />
      <circle cx="106" cy="112" fill="var(--accent)" opacity="0.45" r="3" />
      <text fill="var(--ink-faint)" fontSize="7" fontWeight="700" x="114" y="115">
        OFF
      </text>
    </svg>
  );
}

function StyleManual() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <GroundShadow cx={52} cy={148} rx={14} />
      <GroundShadow cx={188} cy={148} rx={14} />
      <Figure facing="right" pose="standing" variant="partner-a" x={52} y={108} scale={0.78} />
      <Figure facing="left" pose="lean-away" variant="partner-b" x={188} y={106} scale={0.82} />
      <path
        d="M72 96 Q120 72 168 96"
        fill="none"
        stroke="var(--accent)"
        strokeDasharray="4 4"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <PaperCard label="Anchor" rotate={-10} tone="moss" x={92} y={52} />
      <PaperCard label="Island" rotate={4} tone="blueprint" x={120} y={44} />
      <PaperCard label="Wave" rotate={14} tone="accent" x={148} y={50} />
      <g transform="translate(168 118)">
        <rect
          fill="var(--artifact-fill)"
          height="48"
          rx="3"
          stroke="var(--artifact-stroke)"
          strokeWidth="1.2"
          width="36"
        />
        <line stroke="var(--line-strong)" strokeWidth="0.9" x1="6" x2="30" y1="14" y2="14" />
        <line stroke="var(--line-strong)" strokeWidth="0.9" x1="6" x2="26" y1="22" y2="22" />
        <line stroke="var(--line-strong)" strokeWidth="0.9" x1="6" x2="28" y1="30" y2="30" />
        <text fill="var(--ink-faint)" fontSize="6" fontWeight="700" letterSpacing="0.08em" x="6" y="42">
          MANUAL
        </text>
      </g>
    </svg>
  );
}

function ExpertCards() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <rect fill={`url(#${id}-grid)`} height="180" opacity="0.55" width="240" />
      <rect
        fill="var(--paper-elevated)"
        height="48"
        rx="4"
        stroke="var(--accent)"
        strokeWidth="1.2"
        transform="rotate(-3 52 72)"
        width="76"
        x="14"
        y="48"
      />
      <g transform="translate(14 52)">
        <text fill="var(--accent-dark)" fontSize="8" fontWeight="700" x="0" y="16">
          Bad thing
        </text>
        <line stroke="var(--line-strong)" strokeWidth="1" x1="0" x2="56" y1="22" y2="22" />
        <text fill="var(--ink-muted)" fontSize="7" x="0" y="36">
          Public exposure
        </text>
      </g>
      <path
        d="M96 72 L112 72"
        markerEnd={`url(#${id}-arrow)`}
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      <rect
        fill="var(--paper-elevated)"
        height="48"
        rx="4"
        stroke="var(--moss)"
        strokeWidth="1.5"
        transform="rotate(2 164 72)"
        width="76"
        x="126"
        y="48"
      />
      <g transform="translate(136 52)">
        <text fill="var(--moss)" fontSize="8" fontWeight="700" x="0" y="16">
          Antidote
        </text>
        <line stroke="var(--line-strong)" strokeWidth="1" x1="0" x2="56" y1="22" y2="22" />
        <text fill="var(--ink-muted)" fontSize="7" x="0" y="36">
          Step in, debrief
        </text>
      </g>
      <rect
        fill="var(--gold)"
        height="3"
        opacity="0.35"
        rx="1"
        width="28"
        x="106"
        y="118"
      />
    </svg>
  );
}

function DoorLamp() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <rect fill="var(--paper-soft)" height="100" opacity="0.5" width="72" x="28" y="36" />
      <rect
        fill="var(--artifact-fill)"
        height="96"
        stroke="var(--artifact-stroke)"
        strokeWidth="1.5"
        width="56"
        x="36"
        y="40"
      />
      <rect
        fill="var(--accent-dark)"
        height="40"
        stroke="var(--artifact-stroke)"
        strokeWidth="1"
        width="32"
        x="48"
        y="56"
      />
      <circle cx="72" cy="76" fill="var(--gold)" r="2.5" />
      <Figure facing="right" pose="standing-close" variant="partner-a" x={118} y={112} scale={0.72} />
      <Figure facing="left" pose="standing-close" variant="partner-b" x={148} y={110} scale={0.76} />
      <path
        d="M104 76 L118 76"
        fill="none"
        stroke="var(--accent)"
        strokeDasharray="3 2"
        strokeWidth="1.2"
      />
      <path d="M118 76 L118 62 L136 62 L136 76 Z" fill="var(--gold)" opacity="0.4" />
      <rect fill="var(--paper-soft)" height="10" rx="1" stroke="var(--artifact-stroke)" strokeWidth="1" width="18" x="118" y="76" />
      <path
        d="M152 48 L172 38 L172 58 L152 68 Z"
        fill="var(--artifact-fill)"
        stroke="var(--artifact-stroke)"
        strokeWidth="1.2"
      />
      <line stroke="var(--gold)" strokeWidth="1.5" x1="162" x2="162" y1="58" y2="82" />
      <ellipse cx="162" cy="88" fill="var(--gold)" opacity="0.22" rx="22" ry="12" />
      <path
        d="M142 88 Q162 104 182 88"
        fill="none"
        stroke="var(--gold)"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.65"
      />
    </svg>
  );
}

function GoToTether() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <GroundShadow cx={68} cy={148} rx={14} />
      <GroundShadow cx={172} cy={148} rx={14} />
      <Figure facing="right" pose="reach-phone" variant="partner-a" x={68} y={108} scale={0.82} />
      <Figure facing="left" pose="respond-phone" variant="partner-b" x={172} y={106} scale={0.84} />
      <path
        d="M88 78 Q120 48 152 78"
        fill="none"
        stroke={`url(#${id}-tether)`}
        strokeLinecap="round"
        strokeWidth="2.8"
      />
      <circle cx="120" cy="58" fill="var(--gold)" opacity="0.18" r="12" />
      <text fill="var(--accent-dark)" fontSize="7" fontWeight="700" letterSpacing="0.06em" textAnchor="middle" x="120" y="38">
        FIRST CALL
      </text>
    </svg>
  );
}

function PartyThirds() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <ellipse
        cx="120"
        cy="118"
        fill="var(--artifact-fill)"
        rx="52"
        ry="18"
        stroke="var(--artifact-stroke)"
        strokeWidth="1.2"
      />
      <ellipse cx="120" cy="114" fill="var(--paper-soft)" rx="42" ry="13" />
      <PlaceCard initial="1" x={92} y={108} />
      <PlaceCard initial="2" x={124} y={108} />
      <Figure facing="right" pose="sit-table" variant="partner-a" x={88} y={82} scale={0.72} />
      <Figure facing="left" pose="sit-table" variant="partner-b" x={152} y={80} scale={0.74} />
      <path
        d="M96 76 Q120 68 144 76"
        fill="none"
        stroke="var(--accent-dark)"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <Figure facing="right" pose="standing" variant="guest" x={120} y={48} scale={0.55} />
      <circle
        cx="120"
        cy="52"
        fill="var(--blueprint)"
        opacity="0.08"
        r="22"
        stroke="var(--blueprint)"
        strokeDasharray="3 3"
        strokeWidth="1"
      />
      <text fill="var(--blueprint)" fontSize="7" fontWeight="700" textAnchor="middle" x="120" y="56">
        third
      </text>
    </svg>
  );
}

function SameSideTable() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <rect fill="var(--paper-soft)" height="14" opacity="0.55" rx="2" width="108" x="66" y="88" />
      <rect
        fill="var(--artifact-fill)"
        height="14"
        rx="2"
        stroke="var(--accent-dark)"
        strokeWidth="1.5"
        width="108"
        x="66"
        y="88"
      />
      <text fill="var(--accent-dark)" fontSize="8" fontWeight="700" textAnchor="middle" x="120" y="98">
        the problem
      </text>
      <Figure facing="right" pose="sit-table" variant="partner-a" x={82} y={118} scale={0.68} />
      <Figure facing="right" pose="sit-table" variant="partner-b" x={108} y={116} scale={0.72} />
      <path
        d="M82 82 L82 88 M108 80 L108 88 M132 80 L132 88"
        stroke="var(--line-strong)"
        strokeDasharray="2 2"
        strokeWidth="1"
      />
      <path
        d="M72 124 Q120 132 148 124"
        fill="none"
        stroke="var(--moss)"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.6"
      />
    </svg>
  );
}

function EyeGaze() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <Figure facing="right" pose="profile-close" variant="partner-a" x={78} y={92} scale={1.05} />
      <Figure facing="left" pose="profile-close" variant="partner-b" x={162} y={90} scale={1.08} />
      <path
        d="M98 88 Q120 76 142 86"
        fill="none"
        stroke="var(--accent)"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <circle cx="120" cy="78" fill="var(--accent)" opacity="0.2" r="8" />
      <path
        d="M68 58 Q120 42 172 58"
        fill="none"
        stroke="var(--gold)"
        strokeLinecap="round"
        strokeWidth="1"
        opacity="0.45"
      />
    </svg>
  );
}

function HealingHands() {
  const id = useId().replace(/:/g, '');
  return (
    <svg aria-hidden="true" className="chapter-artifact__svg" viewBox="0 0 240 180">
      <SceneDefs id={id} />
      <rect fill={`url(#${id}-paper)`} height="180" width="240" />
      <GroundShadow cx={120} cy={152} rx={44} ry={8} />
      <Figure facing="right" pose="hands-reach" variant="partner-a" x={82} y={108} scale={0.82} />
      <Figure facing="left" pose="hands-offer" variant="partner-b" x={158} y={106} scale={0.84} />
      <circle cx="120" cy="98" fill="var(--gold)" opacity="0.22" r="18" />
      <path
        d="M104 96 Q120 88 136 96"
        fill="none"
        stroke="var(--accent)"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M108 118 L120 128 L132 118"
        fill="none"
        stroke="var(--moss)"
        strokeLinecap="round"
        strokeWidth="1.2"
        opacity="0.65"
      />
    </svg>
  );
}

function PlaceCard({ x, y, initial }: { x: number; y: number; initial: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        fill="var(--paper-elevated)"
        height="18"
        rx="2"
        stroke="var(--accent)"
        strokeWidth="1"
        width="16"
      />
      <text fill="var(--accent-dark)" fontSize="8" fontWeight="800" textAnchor="middle" x="8" y="12">
        {initial}
      </text>
    </g>
  );
}

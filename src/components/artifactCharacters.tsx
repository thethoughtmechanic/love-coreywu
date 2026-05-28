import type { ReactNode } from 'react';

export type FigureVariant = 'partner-a' | 'partner-b' | 'guest';

export type FigurePose =
  | 'standing'
  | 'standing-close'
  | 'lean-away'
  | 'lean-forward'
  | 'seated-driver'
  | 'seated-passenger'
  | 'reach-phone'
  | 'respond-phone'
  | 'sit-table'
  | 'profile-close'
  | 'hands-reach'
  | 'hands-offer';

type FigureProps = {
  x: number;
  y: number;
  facing?: 'left' | 'right';
  variant: FigureVariant;
  pose?: FigurePose;
  scale?: number;
};

const palette = {
  'partner-a': {
    top: 'var(--blueprint)',
    topShade: '#264a5e',
    bottom: '#1e3d4f',
    hair: 'var(--accent-dark)',
    shoe: '#2a211c',
  },
  'partner-b': {
    top: 'var(--moss)',
    topShade: '#4f5a3c',
    bottom: 'var(--accent-dark)',
    hair: '#3d2e24',
    shoe: '#2a211c',
  },
  guest: {
    top: 'var(--ink-muted)',
    topShade: '#575047',
    bottom: '#464038',
    hair: '#3a342e',
    shoe: '#2a211c',
  },
};

export function GroundShadow({ cx, cy, rx = 18, ry = 4 }: { cx: number; cy: number; rx?: number; ry?: number }) {
  return <ellipse cx={cx} cy={cy} fill="var(--artifact-shadow)" opacity="0.28" rx={rx} ry={ry} />;
}

export function Figure({
  x,
  y,
  facing = 'right',
  variant,
  pose = 'standing',
  scale = 1,
}: FigureProps) {
  const flip = facing === 'left' ? -1 : 1;
  const colors = palette[variant];
  const isA = variant === 'partner-a';
  const isGuest = variant === 'guest';

  return (
    <g transform={`translate(${x} ${y}) scale(${flip * scale} ${scale})`}>
      {pose === 'seated-driver' ? (
        <SeatedDriver colors={colors} isA={isA} role="driver" />
      ) : pose === 'seated-passenger' ? (
        <SeatedDriver colors={colors} isA={isA} role="passenger" />
      ) : pose === 'reach-phone' ? (
        <PhoneReach colors={colors} isA={isA} reaching />
      ) : pose === 'respond-phone' ? (
        <PhoneReach colors={colors} isA={isA} reaching={false} />
      ) : pose === 'sit-table' ? (
        <SitTable colors={colors} isA={isA} isGuest={isGuest} />
      ) : pose === 'profile-close' ? (
        <ProfileClose colors={colors} isA={isA} />
      ) : pose === 'hands-reach' ? (
        <HandsPose colors={colors} isA={isA} reaching />
      ) : pose === 'hands-offer' ? (
        <HandsPose colors={colors} isA={isA} reaching={false} />
      ) : pose === 'lean-away' ? (
        <StandingBody colors={colors} isA={isA} isGuest={isGuest} lean={-8} armGap={14} />
      ) : pose === 'lean-forward' ? (
        <StandingBody colors={colors} isA={isA} isGuest={isGuest} lean={6} armGap={6} />
      ) : pose === 'standing-close' ? (
        <StandingBody colors={colors} isA={isA} isGuest={isGuest} lean={2} armGap={4} compact />
      ) : (
        <StandingBody colors={colors} isA={isA} isGuest={isGuest} lean={0} armGap={8} />
      )}
    </g>
  );
}

type ColorSet = (typeof palette)['partner-a'];

function StandingBody({
  colors,
  isA,
  isGuest = false,
  lean,
  armGap,
  compact = false,
}: {
  colors: ColorSet;
  isA: boolean;
  isGuest?: boolean;
  lean: number;
  armGap: number;
  compact?: boolean;
}) {
  const legH = compact ? 24 : 28;
  return (
    <g transform={`rotate(${lean})`}>
      <GroundShadow cx={0} cy={legH + 10} rx={compact ? 12 : 14} />
      <rect fill={colors.bottom} height={legH} width="4.5" x="-5" y={compact ? 8 : 6} />
      <rect fill={colors.bottom} height={legH} width="4.5" x="0.5" y={compact ? 8 : 6} />
      <ellipse cx="-2.5" cy={legH + 9} fill={colors.shoe} rx="3.5" ry="1.6" />
      <ellipse cx="3" cy={legH + 9} fill={colors.shoe} rx="3.5" ry="1.6" />
      <path d={`M-11 0 L11 0 L13 ${compact ? 22 : 26} L-13 ${compact ? 22 : 26} Z`} fill={colors.top} />
      <path d="M-11 0 L11 0 L9 8 L-9 8 Z" fill={colors.topShade} opacity="0.55" />
      <rect fill={colors.top} height="18" width="5" x={-armGap - 5} y="2" rx="1" />
      <rect fill={colors.top} height="16" width="5" x={armGap} y="4" rx="1" />
      <Head isA={isA} isGuest={isGuest} neckY={compact ? -2 : -4} />
    </g>
  );
}

function SeatedDriver({
  colors,
  isA,
  role,
}: {
  colors: ColorSet;
  isA: boolean;
  role: 'driver' | 'passenger';
}) {
  const tense = role === 'driver';
  const turned = role === 'passenger';
  return (
    <g transform={turned ? 'rotate(-12)' : 'rotate(4)'}>
      <ellipse cx="0" cy="22" fill="var(--artifact-shadow)" opacity="0.2" rx="14" ry="3" />
      <path
        d="M-14 8 Q0 2 14 8 L12 24 Q0 20 -12 24 Z"
        fill="var(--paper-soft)"
        stroke="var(--artifact-stroke)"
        strokeWidth="1"
      />
      <path d="M-10 6 L10 6 L11 20 L-11 20 Z" fill={colors.top} />
      <path d="M-10 6 L10 6 L8 12 L-8 12 Z" fill={colors.topShade} opacity="0.5" />
      {tense ? (
        <>
          <rect fill={colors.top} height="10" rx="1" width="4" x="-12" y="8" />
          <rect fill={colors.top} height="8" rx="1" width="4" x="10" y="10" transform="rotate(-18 12 14)" />
        </>
      ) : (
        <>
          <rect fill={colors.top} height="12" rx="1" width="4" x="-14" y="10" transform="rotate(24 -12 16)" />
          <rect fill={colors.top} height="10" rx="1" width="4" x="8" y="12" />
        </>
      )}
      <Head isA={isA} neckY={-6} scale={0.88} tilt={tense ? 6 : -8} />
      {tense && (
        <path
          d="M6 -14 Q10 -18 14 -12"
          fill="none"
          stroke="var(--accent)"
          strokeLinecap="round"
          strokeWidth="1.2"
          opacity="0.7"
        />
      )}
    </g>
  );
}

function PhoneReach({ colors, isA, reaching }: { colors: ColorSet; isA: boolean; reaching: boolean }) {
  return (
    <g>
      <GroundShadow cx={0} cy={38} />
      <rect fill={colors.bottom} height="28" width="4.5" x="-5" y="8" />
      <rect fill={colors.bottom} height="28" width="4.5" x="0.5" y="8" />
      <ellipse cx="-2.5" cy="37" fill={colors.shoe} rx="3.5" ry="1.6" />
      <ellipse cx="3" cy="37" fill={colors.shoe} rx="3.5" ry="1.6" />
      <path d="M-11 0 L11 0 L13 26 L-13 26 Z" fill={colors.top} />
      <path d="M-11 0 L11 0 L9 8 L-9 8 Z" fill={colors.topShade} opacity="0.55" />
      {reaching ? (
        <>
          <rect fill={colors.top} height="16" width="5" x="-14" y="4" rx="1" transform="rotate(28 -11 12)" />
          <rect fill={colors.top} height="14" width="5" x="8" y="6" rx="1" />
          <rect
            fill="var(--paper-elevated)"
            height="14"
            rx="2"
            stroke="var(--artifact-stroke)"
            strokeWidth="1"
            width="8"
            x="14"
            y="-2"
          />
          <circle cx="18" cy="6" fill="var(--accent)" opacity="0.35" r="1.5" />
        </>
      ) : (
        <>
          <rect fill={colors.top} height="16" width="5" x="-12" y="4" rx="1" />
          <rect fill={colors.top} height="14" width="5" x="6" y="2" rx="1" transform="rotate(-32 8 9)" />
          <rect
            fill="var(--paper-elevated)"
            height="14"
            rx="2"
            stroke="var(--gold)"
            strokeWidth="1.2"
            width="8"
            x="-22"
            y="-4"
          />
          <circle cx="-18" cy="4" fill="var(--gold)" opacity="0.45" r="2" />
        </>
      )}
      <Head isA={isA} neckY={-4} />
    </g>
  );
}

function SitTable({ colors, isA, isGuest = false }: { colors: ColorSet; isA: boolean; isGuest?: boolean }) {
  return (
    <g transform="translate(0 6)">
      <ellipse cx="0" cy="18" fill="var(--artifact-shadow)" opacity="0.18" rx="12" ry="2.5" />
      <path d="M-12 4 Q0 -2 12 4 L10 16 Q0 12 -10 16 Z" fill={colors.top} />
      <rect fill={colors.top} height="8" width="4" x="-10" y="6" rx="1" />
      <rect fill={colors.top} height="8" width="4" x="6" y="6" rx="1" />
      <Head isA={isA} isGuest={isGuest} neckY={-8} scale={0.82} />
    </g>
  );
}

function ProfileClose({ colors, isA }: { colors: ColorSet; isA: boolean }) {
  return (
    <g>
      <ellipse cx="0" cy="4" fill="var(--paper-elevated)" rx="16" ry="18" stroke="var(--accent-dark)" strokeWidth="1.2" />
      <ellipse cx="0" cy="2" fill="var(--artifact-skin)" rx="13" ry="14" />
      {isA ? (
        <path d="M-10 -6 Q0 -14 8 -4 L6 0 Q0 -6 -6 0 Z" fill={colors.hair} />
      ) : (
        <path d="M-9 -8 Q0 -16 9 -8 L9 -2 Q0 -8 -9 -2 Z" fill={colors.hair} />
      )}
      <circle cx="-4" cy="0" fill="var(--accent-dark)" r="2.2" />
      <path d="M-2 6 Q0 8 2 6" fill="none" stroke="var(--accent)" strokeLinecap="round" strokeWidth="1" />
      <path d="M8 0 L14 0" stroke="var(--accent)" strokeLinecap="round" strokeWidth="1.2" opacity="0.6" />
    </g>
  );
}

function HandsPose({
  colors,
  isA,
  reaching,
}: {
  colors: ColorSet;
  isA: boolean;
  reaching: boolean;
}) {
  return (
    <g>
      <GroundShadow cx={0} cy={38} rx={12} />
      <rect fill={colors.bottom} height="26" width="4" x="-4" y="10" />
      <rect fill={colors.bottom} height="26" width="4" x="1" y="10" />
      <path d="M-10 2 L10 2 L12 24 L-12 24 Z" fill={colors.top} />
      {reaching ? (
        <path
          d="M10 8 C18 6 22 10 20 14 C18 16 14 14 12 12"
          fill="var(--artifact-skin)"
          stroke="var(--artifact-stroke)"
          strokeLinecap="round"
          strokeWidth="1"
        />
      ) : (
        <path
          d="M-10 8 C-18 6 -22 10 -20 14 C-18 16 -14 14 -12 12"
          fill="var(--artifact-skin)"
          stroke="var(--artifact-stroke)"
          strokeLinecap="round"
          strokeWidth="1"
        />
      )}
      <Head isA={isA} neckY={-2} scale={0.9} />
    </g>
  );
}

function Head({
  isA,
  isGuest = false,
  neckY,
  scale = 1,
  tilt = 0,
}: {
  isA: boolean;
  isGuest?: boolean;
  neckY: number;
  scale?: number;
  tilt?: number;
}) {
  const hair = isGuest ? palette.guest.hair : isA ? palette['partner-a'].hair : palette['partner-b'].hair;
  return (
    <g transform={`translate(0 ${neckY}) scale(${scale}) rotate(${tilt})`}>
      <rect fill="var(--artifact-skin)" height="7" rx="1" width="7" x="-3.5" y="0" />
      <ellipse cx="0" cy="-10" fill="var(--artifact-skin)" rx="9" ry="10" />
      {isA ? (
        <path d="M-9 -12 Q0 -22 9 -12 L8 -4 Q0 -10 -8 -4 Z" fill={hair} />
      ) : isGuest ? (
        <path d="M-8 -12 Q0 -20 8 -12 L7 -5 Q0 -9 -7 -5 Z" fill={hair} />
      ) : (
        <path d="M-9 -14 Q0 -24 9 -14 L9 -6 Q0 -12 -9 -6 Z" fill={hair} />
      )}
      <circle cx="-3" cy="-10" fill="var(--accent-dark)" r="1.2" opacity="0.85" />
      <circle cx="3" cy="-10" fill="var(--accent-dark)" r="1.2" opacity="0.85" />
    </g>
  );
}

export function PaperCard({
  x,
  y,
  rotate,
  label,
  tone,
  width = 40,
  height = 52,
}: {
  x: number;
  y: number;
  rotate: number;
  label: string;
  tone: 'moss' | 'blueprint' | 'accent' | 'gold';
  width?: number;
  height?: number;
}) {
  const stroke = {
    moss: 'var(--moss)',
    blueprint: 'var(--blueprint)',
    accent: 'var(--accent)',
    gold: 'var(--gold)',
  }[tone];

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect
        fill="var(--paper-elevated)"
        height={height}
        rx="3"
        stroke={stroke}
        strokeWidth="1.4"
        width={width}
        x={-width / 2}
        y={-height / 2}
      />
      <line
        stroke="var(--line-strong)"
        strokeWidth="0.8"
        x1={-width / 2 + 6}
        x2={width / 2 - 6}
        y1={-height / 2 + 14}
        y2={-height / 2 + 14}
      />
      <text fill={stroke} fontSize="7" fontWeight="800" textAnchor="middle" x="0" y="4">
        {label}
      </text>
    </g>
  );
}

export function SceneBackdrop({ paperId, children }: { paperId: string; children?: ReactNode }) {
  return (
    <>
      <rect fill={`url(#${paperId})`} height="180" width="240" />
      <rect fill="var(--paper-soft)" height="28" opacity="0.45" width="240" y="132" />
      {children}
    </>
  );
}

export function SceneDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-paper`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="rgba(255, 253, 248, 0.98)" />
        <stop offset="100%" stopColor="rgba(242, 234, 223, 0.92)" />
      </linearGradient>
      <linearGradient id={`${id}-tether`} x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0%" stopColor="var(--accent)" />
        <stop offset="100%" stopColor="var(--gold)" />
      </linearGradient>
      <marker id={`${id}-arrow`} markerHeight="6" markerWidth="6" orient="auto" refX="5" refY="3">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
      </marker>
      <pattern height="8" id={`${id}-grid`} patternUnits="userSpaceOnUse" width="8">
        <path d="M8 0 L0 0 0 8" fill="none" stroke="rgba(56, 43, 30, 0.04)" strokeWidth="0.6" />
      </pattern>
    </defs>
  );
}

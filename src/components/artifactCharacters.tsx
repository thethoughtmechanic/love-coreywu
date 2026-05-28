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
  | 'face-close'
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
    top: 'var(--figure-a-top)',
    topShade: 'var(--figure-a-shade)',
    bottom: 'var(--figure-a-bottom)',
    hair: '#0a0a0a',
    shoe: '#2a211c',
  },
  'partner-b': {
    top: 'var(--figure-b-top)',
    topShade: 'var(--figure-b-shade)',
    bottom: 'var(--figure-b-bottom)',
    hair: '#0a0a0a',
    shoe: '#2a211c',
  },
  guest: {
    top: 'var(--figure-guest-top)',
    topShade: '#575047',
    bottom: '#464038',
    hair: '#1f1a18',
    shoe: '#2a211c',
  },
};

/** Shared body proportions aligned with Corey's World cast (head ~1:3.5 to torso). */
const BODY = {
  shoulderHalf: 9,
  hipHalf: 7.5,
  torsoTop: 7,
  torsoBottom: 38,
  legHeight: 30,
  neckW: 6,
  neckH: 7,
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
      ) : pose === 'face-close' ? (
        <FaceClose colors={colors} isA={isA} isGuest={isGuest} />
      ) : pose === 'hands-reach' ? (
        <HandsPose colors={colors} isA={isA} reaching />
      ) : pose === 'hands-offer' ? (
        <HandsPose colors={colors} isA={isA} reaching={false} />
      ) : pose === 'lean-away' ? (
        <StandingBody colors={colors} isA={isA} isGuest={isGuest} lean={-8} armGap={13} />
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

function Neck() {
  return (
    <rect
      fill="var(--artifact-skin)"
      height={BODY.neckH}
      rx="2"
      width={BODY.neckW}
      x={-BODY.neckW / 2}
      y="0.5"
    />
  );
}

function Torso({ colors, top = BODY.torsoTop, bottom = BODY.torsoBottom }: { colors: ColorSet; top?: number; bottom?: number }) {
  const sh = BODY.shoulderHalf;
  const hip = BODY.hipHalf;
  return (
    <>
      <path d={`M-${sh} ${top} L${sh} ${top} L${hip + 0.5} ${bottom} L-${hip + 0.5} ${bottom} Z`} fill={colors.top} />
      <path
        d={`M-${sh} ${top} L${sh} ${top} L${sh - 1.5} ${top + 8} L-${sh - 1.5} ${top + 8} Z`}
        fill={colors.topShade}
        opacity="0.55"
      />
    </>
  );
}

function StandingLegs({ colors, compact = false }: { colors: ColorSet; compact?: boolean }) {
  const legH = compact ? 26 : BODY.legHeight;
  const legY = BODY.torsoBottom - 2;
  const footY = legY + legH + 1;
  return (
    <>
      <rect fill={colors.bottom} height={legH} width="4.5" x="-5" y={legY} />
      <rect fill={colors.bottom} height={legH} width="4.5" x="0.5" y={legY} />
      <ellipse cx="-2.5" cy={footY} fill={colors.shoe} rx="3.5" ry="1.6" />
      <ellipse cx="3" cy={footY} fill={colors.shoe} rx="3.5" ry="1.6" />
    </>
  );
}

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
  const legH = compact ? 26 : BODY.legHeight;
  const footY = BODY.torsoBottom - 2 + legH + 1;
  const armLen = compact ? 15 : 18;

  return (
    <g transform={`rotate(${lean})`}>
      <GroundShadow cx={0} cy={footY + 2} rx={compact ? 12 : 14} />
      <StandingLegs colors={colors} compact={compact} />
      <Torso colors={colors} />
      <Neck />
      <rect fill={colors.top} height={armLen} width="5" x={-armGap - 5} y={BODY.torsoTop + 1} rx="1" />
      <rect fill={colors.top} height={armLen - 2} width="5" x={armGap} y={BODY.torsoTop + 3} rx="1" />
      <Head isA={isA} isGuest={isGuest} y={0} scale={compact ? 0.94 : 1} />
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
      <ellipse cx="0" cy="28" fill="var(--artifact-shadow)" opacity="0.2" rx="14" ry="3" />
      <path
        d="M-14 10 Q0 4 14 10 L12 28 Q0 24 -12 28 Z"
        fill="var(--paper-soft)"
        stroke="var(--artifact-stroke)"
        strokeWidth="1"
      />
      <path d="M-9 8 L9 8 L10 26 L-10 26 Z" fill={colors.top} />
      <path d="M-9 8 L9 8 L7.5 15 L-7.5 15 Z" fill={colors.topShade} opacity="0.5" />
      <rect fill="var(--artifact-skin)" height="6" rx="1.5" width="5.5" x="-2.75" y="1.5" />
      {tense ? (
        <>
          <rect fill={colors.top} height="12" rx="1" width="4" x="-12" y="10" />
          <rect fill={colors.top} height="10" rx="1" width="4" x="10" y="12" transform="rotate(-18 12 16)" />
        </>
      ) : (
        <>
          <rect fill={colors.top} height="14" rx="1" width="4" x="-14" y="12" transform="rotate(24 -12 18)" />
          <rect fill={colors.top} height="12" rx="1" width="4" x="8" y="14" />
        </>
      )}
      <Head isA={isA} y={0} scale={0.9} tilt={tense ? 6 : -8} />
      {tense && (
        <path
          d="M6 -16 Q10 -20 14 -14"
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
  const footY = BODY.torsoBottom - 2 + BODY.legHeight + 1;
  return (
    <g>
      <GroundShadow cx={0} cy={footY + 2} />
      <StandingLegs colors={colors} />
      <Torso colors={colors} />
      <Neck />
      {reaching ? (
        <>
          <rect fill={colors.top} height="18" width="5" x="-14" y="9" rx="1" transform="rotate(28 -11 18)" />
          <rect fill={colors.top} height="16" width="5" x="8" y="10" rx="1" />
          <rect
            fill="var(--paper-elevated)"
            height="14"
            rx="2"
            stroke="var(--artifact-stroke)"
            strokeWidth="1"
            width="8"
            x="14"
            y="0"
          />
          <circle cx="18" cy="8" fill="var(--accent)" opacity="0.35" r="1.5" />
        </>
      ) : (
        <>
          <rect fill={colors.top} height="18" width="5" x="-12" y="9" rx="1" />
          <rect fill={colors.top} height="16" width="5" x="6" y="7" rx="1" transform="rotate(-32 8 15)" />
          <rect
            fill="var(--paper-elevated)"
            height="14"
            rx="2"
            stroke="var(--gold)"
            strokeWidth="1.2"
            width="8"
            x="-22"
            y="-2"
          />
          <circle cx="-18" cy="6" fill="var(--gold)" opacity="0.45" r="2" />
        </>
      )}
      <Head isA={isA} y={0} />
    </g>
  );
}

function SitTable({ colors, isA, isGuest = false }: { colors: ColorSet; isA: boolean; isGuest?: boolean }) {
  const floorY = 22;
  const seatY = 10;
  const torsoTop = -13;
  const shoulderHalf = 6;
  const seatHalf = 7;
  const neckH = 4.5;
  const neckW = 5;
  const headY = torsoTop - neckH;
  return (
    <g>
      <GroundShadow cx={0} cy={floorY} rx={11} ry={2.5} />
      <path
        d={`M-3.5 ${seatY + 2} L-3.5 ${floorY - 2}`}
        fill="none"
        stroke={colors.bottom}
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d={`M2.5 ${seatY + 2} L2.5 ${floorY - 2}`}
        fill="none"
        stroke={colors.bottom}
        strokeLinecap="round"
        strokeWidth="4"
      />
      <ellipse cx="-3.5" cy={floorY - 1.5} fill={colors.shoe} rx="3.2" ry="1.5" />
      <ellipse cx="2.5" cy={floorY - 1.5} fill={colors.shoe} rx="3.2" ry="1.5" />
      <path
        d={`M-${seatHalf} ${seatY} L${seatHalf} ${seatY - 1} L${seatHalf + 1} ${seatY + 5} L-${seatHalf + 1} ${seatY + 6} Z`}
        fill={colors.bottom}
      />
      <path
        d={`M-${shoulderHalf} ${torsoTop} L${shoulderHalf} ${torsoTop} L${seatHalf} ${seatY} L-${seatHalf} ${seatY} Z`}
        fill={colors.top}
      />
      <path
        d={`M-${shoulderHalf} ${torsoTop} L${shoulderHalf} ${torsoTop} L${shoulderHalf - 1} ${torsoTop + 7} L-${shoulderHalf - 1} ${torsoTop + 7} Z`}
        fill={colors.topShade}
        opacity="0.5"
      />
      <rect fill="var(--artifact-skin)" height={neckH} rx="1.5" width={neckW} x={-neckW / 2} y={torsoTop - neckH + 0.5} />
      <rect
        fill={colors.top}
        height="10"
        width="3.5"
        x={-shoulderHalf - 4}
        y={torsoTop + 2}
        rx="1"
        transform={`rotate(14 ${-shoulderHalf - 2} ${torsoTop + 7})`}
      />
      <rect
        fill={colors.top}
        height="10"
        width="3.5"
        x={shoulderHalf + 0.5}
        y={torsoTop + 2}
        rx="1"
        transform={`rotate(-12 ${shoulderHalf + 2} ${torsoTop + 7})`}
      />
      <Head isA={isA} isGuest={isGuest} y={headY} scale={0.93} />
    </g>
  );
}

function FaceClose({
  colors,
  isA,
  isGuest = false,
}: {
  colors: ColorSet;
  isA: boolean;
  isGuest?: boolean;
}) {
  const torsoTop = 8;
  const torsoBottom = 36;
  return (
    <g transform="rotate(7)">
      <path
        d={`M-${BODY.shoulderHalf - 1} ${torsoTop} L${BODY.shoulderHalf - 1} ${torsoTop} L${BODY.hipHalf} ${torsoBottom} L-${BODY.hipHalf} ${torsoBottom} Z`}
        fill={colors.top}
      />
      <path
        d={`M-${BODY.shoulderHalf - 1} ${torsoTop} L${BODY.shoulderHalf - 1} ${torsoTop} L${BODY.shoulderHalf - 2.5} ${torsoTop + 10} L-${BODY.shoulderHalf - 2.5} ${torsoTop + 10} Z`}
        fill={colors.topShade}
        opacity="0.55"
      />
      <rect fill="var(--artifact-skin)" height="7" rx="2" width="6" x="-3" y="0.5" />
      <rect fill={colors.top} height="14" width="5" x="-14" y="12" rx="1" transform="rotate(18 -11 19)" />
      <rect fill={colors.top} height="14" width="5" x="9" y="12" rx="1" transform="rotate(-16 11 19)" />
      <Head isA={isA} isGuest={isGuest} y={0} scale={1} lookToward="right" tilt={-4} />
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
  const footY = BODY.torsoBottom - 2 + BODY.legHeight + 1;
  return (
    <g>
      <GroundShadow cx={0} cy={footY + 2} rx={12} />
      <StandingLegs colors={colors} />
      <Torso colors={colors} bottom={34} />
      <Neck />
      {reaching ? (
        <path
          d="M10 12 C18 10 22 14 20 18 C18 20 14 18 12 16"
          fill="var(--artifact-skin)"
          stroke="var(--artifact-stroke)"
          strokeLinecap="round"
          strokeWidth="1"
        />
      ) : (
        <path
          d="M-10 12 C-18 10 -22 14 -20 18 C-18 20 -14 18 -12 16"
          fill="var(--artifact-skin)"
          stroke="var(--artifact-stroke)"
          strokeLinecap="round"
          strokeWidth="1"
        />
      )}
      <Head isA={isA} y={0} scale={0.94} />
    </g>
  );
}

function Head({
  isA,
  isGuest = false,
  y = 0,
  scale = 1,
  tilt = 0,
  lookToward = 'center',
}: {
  isA: boolean;
  isGuest?: boolean;
  y?: number;
  scale?: number;
  tilt?: number;
  lookToward?: 'left' | 'right' | 'center';
}) {
  const hair = isGuest ? palette.guest.hair : isA ? palette['partner-a'].hair : palette['partner-b'].hair;
  const simple = scale < 0.88;
  const eyeY = -9;
  const gazeX = lookToward === 'right' ? 0.55 : lookToward === 'left' ? -0.55 : 0;

  return (
    <g transform={`translate(0 ${y}) scale(${scale}) rotate(${tilt})`}>
      {!isA && !isGuest && (
        <path
          d="M-10.4 -15.2 L-10.6 -3.6 Q-9 -1.6 -8 -5 Q-9 -8.4 -10.4 -15.2 Z"
          fill={hair}
        />
      )}
      {!isA && !isGuest && (
        <path
          d="M10.4 -15.2 L10.6 -3.6 Q9 -1.6 8 -5 Q9 -8.4 10.4 -15.2 Z"
          fill={hair}
        />
      )}
      <ellipse cx="0" cy="-9" fill="var(--artifact-skin)" rx="8.5" ry="9.5" />
      {isA ? (
        <>
          <ellipse cx="0" cy="-17.2" fill={hair} rx="9.6" ry="4.8" />
          <path
            d="M-9.6 -15.2 Q-5 -21.2 0 -20.2 Q5.2 -21.2 9.8 -15 Q10 -12.8 7.8 -12 Q0 -13.6 -7.4 -12 Q-9.6 -12.8 -9.6 -15.2 Z"
            fill={hair}
          />
          <path d="M-9.4 -14.2 Q-10 -10.6 -8.4 -8.2 Q-7.6 -10.8 -8.4 -12.8 Z" fill={hair} />
          <path d="M9.4 -14.2 Q10.2 -10.6 8.6 -8.2 Q7.8 -10.8 8.6 -12.8 Z" fill={hair} />
        </>
      ) : isGuest ? (
        <>
          <ellipse cx="0" cy="-17" fill={hair} rx="9" ry="4.5" />
          <path
            d="M-9.2 -15 Q-2.2 -20.6 9.2 -14.6 L8.6 -11.8 Q4.6 -13.2 0 -12.8 Q-4.2 -13.4 -8.2 -11.4 Z"
            fill={hair}
          />
          <path d="M-9 -13.2 L-9.2 -9.8 Q-8 -10.8 -8.2 -12.8 Z" fill={hair} />
          <path d="M9 -13.2 L9.2 -9.8 Q8 -10.8 8.2 -12.8 Z" fill={hair} />
        </>
      ) : (
        <path
          d="M-11.2 -15.2 Q0 -28.4 11.2 -15.2 L11.2 -3.2 Q7.6 -7 5.8 -5.2 L5.8 -9 Q0 -12.8 -5.8 -9 L-5.8 -5.2 Q-7.6 -7 -11.2 -3.2 Z"
          fill={hair}
        />
      )}
      {simple ? (
        <>
          <circle cx={-2.6 + gazeX * 0.4} cy={eyeY} fill="var(--accent-dark)" opacity="0.8" r="0.8" />
          <circle cx={2.6 + gazeX * 0.4} cy={eyeY} fill="var(--accent-dark)" opacity="0.8" r="0.8" />
        </>
      ) : (
        <>
          <ellipse cx={-2.6 + gazeX * 0.25} cy={eyeY} fill="var(--paper-elevated)" rx="1.3" ry="0.95" />
          <ellipse cx={2.6 + gazeX * 0.25} cy={eyeY} fill="var(--paper-elevated)" rx="1.3" ry="0.95" />
          <circle cx={-2.45 + gazeX} cy={eyeY} fill="var(--accent-dark)" opacity="0.85" r="0.7" />
          <circle cx={2.75 + gazeX} cy={eyeY} fill="var(--accent-dark)" opacity="0.85" r="0.7" />
        </>
      )}
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

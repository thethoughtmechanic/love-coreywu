import type { VisualType } from '../data/wiredForLove';
import { AlertTriangle, Anchor, Brain, BriefcaseBusiness, House, Moon, Pause, Sun, TreePalm, Waves, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Figure } from './artifactCharacters';

type ChapterVisualProps = {
  type: VisualType;
};

export function ChapterVisual({ type }: ChapterVisualProps) {
  switch (type) {
    case 'bubble':
      return <BubbleVisual />;
    case 'primitives-ambassadors':
      return <PrimitivesAmbassadorsVisual />;
    case 'attachment-triad':
      return <AttachmentTriadVisual />;
    case 'expert-antidotes':
      return <ExpertAntidotesVisual />;
    case 'ritual-timeline':
      return <RitualTimelineVisual />;
    case 'go-to-tether':
      return <GoToTetherVisual />;
    case 'thirds':
      return <ThirdsVisual />;
    case 'fight-well':
      return <FightWellVisual />;
    case 'eye-contact':
      return <EyeContactVisual />;
    case 'healing-touch':
      return <HealingTouchVisual />;
    default:
      return null;
  }
}

function BubbleVisual() {
  return (
    <div aria-label="Couple bubble boundary diagram" className="chapter-visual chapter-visual--bubble">
      <div className="bubble-diagram">
        <div className="bubble-diagram__outside">
          <span className="bubble-diagram__label">Outsiders and stress</span>
          <ul className="bubble-diagram__tags">
            <li>family</li>
            <li>work</li>
            <li>friends</li>
            <li>old loyalties</li>
          </ul>
        </div>
        <div className="bubble-diagram__membrane">
          <span className="bubble-diagram__membrane-label">Couple filter</span>
        </div>
        <div className="bubble-diagram__inside">
          <span className="bubble-diagram__label bubble-diagram__label--inside">Inside the bubble</span>
          <svg aria-hidden="true" className="bubble-diagram__couple" viewBox="0 0 126 90">
            <rect className="bubble-diagram__couple-field" height="70" rx="28" width="112" x="7" y="8" />
            <path className="bubble-diagram__link" d="M52 42 H74" />
            <Figure pose="standing-close" scale={0.78} variant="partner-a" x={42} y={22} />
            <Figure facing="left" pose="standing-close" scale={0.78} variant="partner-b" x={84} y={22} />
          </svg>
          <p className="bubble-diagram__note">Mutual guarantees, shared protection</p>
        </div>
      </div>
    </div>
  );
}

function PrimitivesAmbassadorsVisual() {
  return (
    <div
      aria-label="Threat response timing: primitives first, ambassadors catch up"
      className="chapter-visual chapter-visual--brain"
    >
      <div className="brain-lanes">
        <section aria-labelledby="brain-lanes-fast-heading" className="brain-lanes__lane brain-lanes__lane--fast">
          <div className="brain-lanes__lane-head">
            <span className="brain-lanes__lane-badge brain-lanes__lane-badge--fast" id="brain-lanes-fast-heading">
              Fast
            </span>
            <span className="brain-lanes__lane-caption">Threat hits primitives first</span>
          </div>
          <div className="brain-lanes__flow">
            <article className="brain-lanes__card brain-lanes__card--spark">
              <span aria-hidden="true" className="brain-lanes__icon">
                <Zap size={20} strokeWidth={2.2} />
              </span>
              <div className="brain-lanes__copy">
                <strong>Threat cue</strong>
                <p>Tone, timing, or history</p>
              </div>
            </article>
            <span aria-hidden="true" className="brain-lanes__arrow brain-lanes__arrow--fast" />
            <article className="brain-lanes__card brain-lanes__card--war">
              <span aria-hidden="true" className="brain-lanes__icon">
                <AlertTriangle size={20} strokeWidth={2.2} />
              </span>
              <div className="brain-lanes__copy">
                <strong>Primitives</strong>
                <ul className="brain-lanes__list">
                  <li>Red alert before full read</li>
                  <li>War scripts without permission</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <div aria-hidden="true" className="brain-lanes__drop">
          <span className="brain-lanes__drop-line" />
          <span className="brain-lanes__drop-node">
            <Pause size={16} strokeWidth={2.4} />
          </span>
          <span className="brain-lanes__drop-line" />
        </div>

        <article className="brain-lanes__bridge">
          <strong>Pause and orient</strong>
          <p>Slow the body before returning to content</p>
        </article>

        <section aria-labelledby="brain-lanes-slow-heading" className="brain-lanes__lane brain-lanes__lane--slow">
          <div className="brain-lanes__lane-head">
            <span className="brain-lanes__lane-badge brain-lanes__lane-badge--slow" id="brain-lanes-slow-heading">
              Slower
            </span>
            <span className="brain-lanes__lane-caption">Ambassadors restore context when they catch up</span>
          </div>
          <article className="brain-lanes__card brain-lanes__card--love brain-lanes__card--wide">
            <span aria-hidden="true" className="brain-lanes__icon">
              <Brain size={20} strokeWidth={2.2} />
            </span>
            <div className="brain-lanes__copy">
              <strong>Ambassadors</strong>
              <ul className="brain-lanes__list">
                <li>Remember context and history</li>
                <li>Empathize and negotiate</li>
                <li>Repair and keep primitives in check</li>
              </ul>
            </div>
          </article>
        </section>

        <p className="brain-lanes__note">Under threat, primitives usually arrive before ambassadors.</p>
      </div>
    </div>
  );
}

function AttachmentTriadVisual() {
  const styles: {
    name: string;
    Icon: LucideIcon;
    tone: 'anchor' | 'island' | 'wave';
    need: string;
    stress: string;
  }[] = [
    { name: 'Anchor', Icon: Anchor, tone: 'anchor', need: 'Closeness and autonomy together', stress: 'More flexible under threat' },
    { name: 'Island', Icon: TreePalm, tone: 'island', need: 'Space to self-regulate', stress: 'Pulls back, minimizes contact' },
    { name: 'Wave', Icon: Waves, tone: 'wave', need: 'Proof of connection', stress: 'Pursues reassurance and contact' },
  ];

  return (
    <div aria-label="Anchor island and wave triad" className="chapter-visual chapter-visual--attachment">
      <div className="style-triad">
        {styles.map((style) => (
          <article className={`style-triad__card style-triad__card--${style.tone}`} key={style.name}>
            <div className="style-triad__header">
              <span aria-hidden="true" className="style-triad__icon">
                <style.Icon size={18} strokeWidth={2.3} />
              </span>
              <h3>{style.name}</h3>
            </div>
            <p>
              <strong>Core need:</strong> {style.need}
            </p>
            <p>
              <strong>Under stress:</strong> {style.stress}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ExpertAntidotesVisual() {
  const pairs = [
    { vulnerability: 'Feeling intruded upon', antidote: 'Approach quietly; ease into closeness' },
    { vulnerability: 'Fear of too much intimacy', antidote: 'Check in: "Do you want me to stop?"' },
    { vulnerability: 'Being separated from activity', antidote: '"Let me know when you are ready"' },
  ];

  return (
    <div aria-label="Vulnerability and antidote pairs" className="chapter-visual chapter-visual--experts">
      <div className="antidote-map">
        {pairs.map((pair) => (
          <div className="antidote-map__row" key={pair.vulnerability}>
            <span className="antidote-map__vuln">
              <span aria-hidden="true" className="antidote-map__pain" />
              <span>{pair.vulnerability}</span>
            </span>
            <span aria-hidden="true" className="antidote-map__arrow">
              →
            </span>
            <span className="antidote-map__fix">{pair.antidote}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RitualTimelineVisual() {
  const moments: { time: string; Icon: LucideIcon; label: string; detail: string }[] = [
    { time: 'Morning', Icon: Sun, label: 'Launch', detail: 'Orient to each other before the day' },
    { time: 'Day', Icon: BriefcaseBusiness, label: 'Apart', detail: 'Know when you will check in' },
    { time: 'Return', Icon: House, label: 'Welcome Home', detail: 'Partner first, eyes, relax together' },
    { time: 'Night', Icon: Moon, label: 'Land', detail: 'Bedtime docking as a team' },
  ];

  return (
    <div aria-label="Launch and land ritual timeline" className="chapter-visual chapter-visual--launch">
      <div className="day-timeline">
        {moments.map((moment, index) => (
          <div className="day-timeline__moment" key={moment.label}>
            <span className="day-timeline__time">{moment.time}</span>
            <div className="day-timeline__node-row">
              <span aria-hidden="true" className="day-timeline__icon">
                <moment.Icon size={20} strokeWidth={2.2} />
              </span>
              {index < moments.length - 1 && <span aria-hidden="true" className="day-timeline__line" />}
            </div>
            <div className="day-timeline__copy">
              <strong>{moment.label}</strong>
              <p>{moment.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoToTetherVisual() {
  return (
    <div aria-label="Go-to tether between partners" className="chapter-visual chapter-visual--goto">
      <div className="tether-diagram">
        <svg aria-hidden="true" className="tether-diagram__scene" viewBox="0 0 260 118">
          <path className="tether-diagram__wire" d="M68 58 H192" />
          <rect className="tether-diagram__badge" height="26" rx="13" width="104" x="78" y="45" />
          <text className="tether-diagram__badge-text" textAnchor="middle" x="130" y="62">
            24/7 GO-TO
          </text>
          <Figure pose="reach-phone" scale={1.05} variant="partner-a" x={52} y={48} />
          <Figure facing="left" pose="respond-phone" scale={1.05} variant="partner-b" x={208} y={48} />
        </svg>
        <p className="tether-diagram__note">First call for distress, news, and mindshare</p>
      </div>
    </div>
  );
}

function ThirdsVisual() {
  return (
    <div aria-label="Partners facing thirds together" className="chapter-visual chapter-visual--thirds">
      <div className="thirds-diagram">
        <svg aria-hidden="true" className="thirds-diagram__scene" viewBox="0 0 260 142">
          <rect className="thirds-diagram__bubble" height="72" rx="28" width="132" x="28" y="34" />
          <path className="thirds-diagram__bond" d="M74 56 H114" />
          <Figure pose="standing-close" scale={0.96} variant="partner-a" x={68} y={62} />
          <Figure facing="left" pose="standing-close" scale={0.96} variant="partner-b" x={120} y={62} />
          <path className="thirds-diagram__boundary" d="M168 44 V102" />
          <Figure facing="left" pose="standing" scale={0.76} variant="guest" x={206} y={66} />
          <text className="thirds-diagram__third-label" textAnchor="middle" x="206" y="126">
            Third
          </text>
        </svg>
        <div className="thirds-diagram__outside">
          <span>Thirds</span>
          <ul>
            <li>family</li>
            <li>friends</li>
            <li>work</li>
            <li>children</li>
          </ul>
        </div>
        <p className="thirds-diagram__note">Face outward as a team; do not let outsiders split the bubble</p>
      </div>
    </div>
  );
}

function FightWellVisual() {
  return (
    <div aria-label="Same side fight well model" className="chapter-visual chapter-visual--fight">
      <div className="workshop-model">
        <svg aria-hidden="true" className="workshop-model__scene" viewBox="0 0 260 180">
          <rect className="workshop-model__table" height="44" rx="13" width="148" x="56" y="10" />
          <text className="workshop-model__problem" textAnchor="middle" x="130" y="38">
            The problem
          </text>
          <Figure facing="right" pose="sit-table" scale={1.12} variant="partner-a" x={74} y={150} />
          <Figure facing="right" pose="sit-table" scale={1.12} variant="partner-b" x={186} y={150} />
        </svg>
        <p className="workshop-model__caption">Win by letting your partner win too</p>
      </div>
    </div>
  );
}

function EyeContactVisual() {
  return (
    <div aria-label="Up close eye contact" className="chapter-visual chapter-visual--eyes">
      <div className="eye-contact-diagram">
        <svg aria-hidden="true" className="eye-contact-diagram__scene" viewBox="0 0 260 148">
          <ellipse cx="130" cy="88" fill="var(--accent-soft)" opacity="0.22" rx="68" ry="36" />
          <path className="eye-contact-diagram__gaze-line" d="M108 52 C120 44 140 44 152 52" />
          <text className="eye-contact-diagram__gaze" textAnchor="middle" x="130" y="32">
            SOFT GAZE
          </text>
          <Figure pose="face-close" scale={1.12} variant="partner-a" x={98} y={88} />
          <Figure facing="left" pose="face-close" scale={1.12} variant="partner-b" x={162} y={88} />
        </svg>
        <p className="eye-contact-diagram__note">Ambassadors engage up close before words negotiate</p>
      </div>
    </div>
  );
}

function HealingTouchVisual() {
  const channels = [
    { name: 'Hug', role: 'Co-regulate stress', icon: 'hug' },
    { name: 'Hand-hold', role: 'Steady the nervous system', icon: 'handhold' },
    { name: 'Sleep care', role: 'Support rest and recovery', icon: 'sleep' },
  ];

  return (
    <div aria-label="Healing touch channels" className="chapter-visual chapter-visual--healing">
      <div className="healing-touch">
        {channels.map((channel) => (
          <article className="healing-touch__card" key={channel.name}>
            <HealingTouchIcon type={channel.icon} />
            <div className="healing-touch__copy">
              <strong>{channel.name}</strong>
              <span>{channel.role}</span>
            </div>
          </article>
        ))}
        <p className="healing-touch__note">Touch and stress care as daily medicine</p>
      </div>
    </div>
  );
}

function HealingTouchIcon({ type }: { type: string }) {
  if (type === 'hug') {
    return (
      <svg aria-hidden="true" className="healing-touch__icon-scene" viewBox="0 0 116 76">
        <path className="healing-touch__halo" d="M26 21 C37 7 79 7 90 21 C102 36 92 62 58 65 C24 62 14 36 26 21Z" />
        <Figure pose="standing-close" scale={0.76} variant="partner-a" x={45} y={36} />
        <Figure facing="left" pose="standing-close" scale={0.76} variant="partner-b" x={71} y={36} />
        <path className="healing-touch__embrace" d="M39 40 C47 49 69 49 77 40" />
      </svg>
    );
  }

  if (type === 'handhold') {
    return (
      <svg aria-hidden="true" className="healing-touch__icon-scene" viewBox="0 0 116 76">
        <path className="healing-touch__floor" d="M25 61 H91" />
        <Figure pose="hands-reach" scale={0.76} variant="partner-a" x={40} y={32} />
        <Figure facing="left" pose="hands-offer" scale={0.76} variant="partner-b" x={76} y={32} />
        <path className="healing-touch__join" d="M53 37 C56 34 60 34 63 37" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="healing-touch__icon-scene" viewBox="0 0 116 76">
      <rect className="healing-touch__bed" height="28" rx="9" width="76" x="20" y="34" />
      <path className="healing-touch__blanket" d="M31 45 H96 V62 H26 C24 54 25 49 31 45Z" />
      <ellipse className="healing-touch__head healing-touch__head--a" cx="43" cy="37" rx="10" ry="9" />
      <ellipse className="healing-touch__head healing-touch__head--b" cx="62" cy="37" rx="10" ry="9" />
      <ellipse className="healing-touch__hair healing-touch__hair--a" cx="43" cy="24" rx="10.5" ry="5" />
      <path
        className="healing-touch__hair healing-touch__hair--a"
        d="M33 29 Q38 19 43 21 Q48 19 53 29 Q52 31.5 49 30.5 Q43 28.5 37 30.5 Q34 31.5 33 29Z"
      />
      <path
        className="healing-touch__hair healing-touch__hair--b"
        d="M51 29 Q62 14 73 29 L73 40 Q68.5 36 66.5 38 L66.5 34 Q62 30 58 34 L58 38 Q55.5 36 51 40 Z"
      />
      <circle className="healing-touch__eye healing-touch__eye--a" cx="40" cy="38" r="1.1" />
      <circle className="healing-touch__eye healing-touch__eye--b" cx="59" cy="38" r="1.1" />
      <path className="healing-touch__moon" d="M84 16 C79 22 82 31 91 33 C83 37 74 31 75 22 C76 16 80 13 84 16Z" />
    </svg>
  );
}

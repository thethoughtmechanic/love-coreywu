import type { VisualType } from '../data/wiredForLove';

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
          <div className="bubble-diagram__pair">
            <span>You</span>
            <span className="bubble-diagram__link" />
            <span>Partner</span>
          </div>
          <p className="bubble-diagram__note">Mutual guarantees, shared protection</p>
        </div>
      </div>
    </div>
  );
}

function PrimitivesAmbassadorsVisual() {
  const lanes = [
    { side: 'Primitives', items: ['Amygdala alarm', 'Fast threat read', 'War scripts'], tone: 'war' },
    { side: 'Ambassadors', items: ['Context and memory', 'Empathy', 'Repair talk'], tone: 'love' },
  ];

  return (
    <div aria-label="Primitives and ambassadors lanes" className="chapter-visual chapter-visual--brain">
      <div className="brain-lanes">
        {lanes.map((lane) => (
          <article className={`brain-lanes__lane brain-lanes__lane--${lane.tone}`} key={lane.side}>
            <h3>{lane.side}</h3>
            <ul>
              {lane.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
        <p className="brain-lanes__note">Under threat, primitives usually arrive before ambassadors.</p>
      </div>
    </div>
  );
}

function AttachmentTriadVisual() {
  const styles = [
    { name: 'Anchor', need: 'Closeness and autonomy', stress: 'Stays oriented toward repair' },
    { name: 'Island', need: 'Space to self-regulate', stress: 'Pulls back, minimizes' },
    { name: 'Wave', need: 'Proof of connection', stress: 'Pursues contact, reassurance' },
  ];

  return (
    <div aria-label="Anchor island and wave triad" className="chapter-visual chapter-visual--attachment">
      <div className="style-triad">
        {styles.map((style) => (
          <article className={`style-triad__card style-triad__card--${style.name.toLowerCase()}`} key={style.name}>
            <h3>{style.name}</h3>
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
    { vulnerability: 'Public embarrassment', antidote: 'Step in, change topic, debrief later' },
    { vulnerability: 'Feeling forgotten', antidote: 'Brief declarative reassurance' },
    { vulnerability: 'Sudden plans', antidote: 'Preview change, offer choice' },
  ];

  return (
    <div aria-label="Vulnerability and antidote pairs" className="chapter-visual chapter-visual--experts">
      <div className="antidote-map">
        {pairs.map((pair) => (
          <div className="antidote-map__row" key={pair.vulnerability}>
            <span className="antidote-map__vuln">{pair.vulnerability}</span>
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
  const moments = [
    { time: 'Morning', label: 'Launch', detail: 'Orient to each other before the day' },
    { time: 'Day', label: 'Apart', detail: 'Know when you will check in' },
    { time: 'Return', label: 'Welcome Home', detail: 'Partner first, eyes, relax together' },
    { time: 'Night', label: 'Land', detail: 'Bedtime docking as a team' },
  ];

  return (
    <div aria-label="Launch and land ritual timeline" className="chapter-visual chapter-visual--launch">
      <div className="day-timeline">
        {moments.map((moment, index) => (
          <div className="day-timeline__moment" key={moment.label}>
            <span className="day-timeline__time">{moment.time}</span>
            <span className="day-timeline__dot" />
            <div className="day-timeline__copy">
              <strong>{moment.label}</strong>
              <p>{moment.detail}</p>
            </div>
            {index < moments.length - 1 && <span aria-hidden="true" className="day-timeline__line" />}
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
        <span className="tether-diagram__person">You</span>
        <div className="tether-diagram__line">
          <span className="tether-diagram__label">24/7 go-to tether</span>
        </div>
        <span className="tether-diagram__person">Partner</span>
        <p className="tether-diagram__note">First call for distress, news, and mindshare</p>
      </div>
    </div>
  );
}

function ThirdsVisual() {
  return (
    <div aria-label="Partners facing thirds together" className="chapter-visual chapter-visual--thirds">
      <div className="thirds-diagram">
        <div className="thirds-diagram__pair">
          <span>You</span>
          <span className="thirds-diagram__bond" />
          <span>Partner</span>
        </div>
        <div className="thirds-diagram__outside">
          <span>Thirds</span>
          <ul>
            <li>family</li>
            <li>friends</li>
            <li>work</li>
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
        <div className="workshop-model__table">
          <span className="workshop-model__problem">The problem</span>
        </div>
        <div className="workshop-model__seats">
          <span>You</span>
          <span>Partner</span>
        </div>
        <p className="workshop-model__caption">Win by letting your partner win too</p>
      </div>
    </div>
  );
}

function EyeContactVisual() {
  return (
    <div aria-label="Up close eye contact" className="chapter-visual chapter-visual--eyes">
      <div className="eye-contact-diagram">
        <div className="eye-contact-diagram__faces">
          <span className="eye-contact-diagram__face">You</span>
          <span className="eye-contact-diagram__gaze">soft gaze</span>
          <span className="eye-contact-diagram__face">Partner</span>
        </div>
        <p className="eye-contact-diagram__note">Ambassadors engage up close before words negotiate</p>
      </div>
    </div>
  );
}

function HealingTouchVisual() {
  const channels = [
    { name: 'Hug', role: 'Co-regulate stress' },
    { name: 'Hand-hold', role: 'Steady the nervous system' },
    { name: 'Sleep care', role: 'Protect hippocampal health' },
  ];

  return (
    <div aria-label="Healing touch channels" className="chapter-visual chapter-visual--healing">
      <div className="healing-touch">
        {channels.map((channel) => (
          <article className="healing-touch__card" key={channel.name}>
            <strong>{channel.name}</strong>
            <span>{channel.role}</span>
          </article>
        ))}
        <p className="healing-touch__note">Touch and stress care as daily medicine</p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { MirrorSessionConfig } from './MirrorTab';
import { MirrorIntentions } from './MirrorIntentions';

type Props = {
  activityTitle?: string;
  chapterLabel?: string;
  initialGoals: string[];
  initialOffLimits: string[];
  onBegin: (config: MirrorSessionConfig) => void;
};

function buildConfig(goals: string[], offLimits: string[]): MirrorSessionConfig {
  return { goals, offLimits };
}

export function MirrorIntent({
  activityTitle,
  chapterLabel,
  initialGoals,
  initialOffLimits,
  onBegin,
}: Props) {
  const [showIntentions, setShowIntentions] = useState(false);

  const beginDefault = () =>
    onBegin({
      ...buildConfig(initialGoals, initialOffLimits),
      activityTitle,
      chapterLabel,
    });

  if (showIntentions) {
    return (
      <MirrorIntentions
        activityTitle={activityTitle}
        chapterLabel={chapterLabel}
        initialGoals={initialGoals}
        initialOffLimits={initialOffLimits}
        onBack={() => setShowIntentions(false)}
        onBegin={onBegin}
      />
    );
  }

  const hasIntentions = initialGoals.length > 0 || initialOffLimits.length > 0;
  const fromPractice = Boolean(activityTitle);

  return (
    <div className="mirror-intent">
      <div className="mirror-intent__hero">
        <p className="eyebrow">Mirror</p>
        {fromPractice ? (
          <>
            <h2>{activityTitle}</h2>
            {chapterLabel && <p className="mirror-intent__chapter">{chapterLabel}</p>}
            <p className="mirror-intent__value">
              Practice together with a full-screen color mirror. Volume shifts green, amber, or red
              so you can stay aligned while you work through this exercise.
            </p>
          </>
        ) : (
          <>
            <h2>Volume mirror for hard talks</h2>
            <p className="mirror-intent__value">
              The screen shifts green, amber, or red from your microphone level. A directional cue,
              not a referee. Nothing leaves your device in this build.
            </p>
          </>
        )}
      </div>

      <div className="mirror-intent__cta-block">
        <button
          className="mobile-primary-button mirror-intent__start"
          onClick={beginDefault}
          type="button"
        >
          Start Mirror session
        </button>
        <p className="mirror-intent__mic-note">
          Uses your microphone in this browser. Allow access when prompted; on a phone, open over
          HTTPS (not plain HTTP).
        </p>
      </div>

      <div className="mirror-intent__optional">
        <button
          className="mirror-intent__intentions-link"
          onClick={() => setShowIntentions(true)}
          type="button"
        >
          Add intentions (optional)
          {hasIntentions ? ' · saved' : ''}
        </button>
      </div>
    </div>
  );
}

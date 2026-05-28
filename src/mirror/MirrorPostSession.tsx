import type { MirrorSessionConfig } from './MirrorTab';

type Props = {
  config: MirrorSessionConfig;
  durationMs: number;
  onNewSession: () => void;
};

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(1, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export function MirrorPostSession({ config, durationMs, onNewSession }: Props) {
  const hasGoals = config.goals.length > 0;
  const hasOffLimits = config.offLimits.length > 0;

  return (
    <div className="mirror-post">
      <header className="mobile-panel__header">
        <p className="eyebrow">Session ended</p>
        <h2>What this build recorded</h2>
        <p className="mobile-panel__lead">
          Mirror only followed microphone volume on your device. No audio was uploaded. Anything below
          is what you chose to keep as reminders, not a scorecard.
        </p>
      </header>

      <dl className="mirror-post__stats">
        <div>
          <dt>Duration</dt>
          <dd>{formatDuration(durationMs)}</dd>
        </div>
        <div>
          <dt>Volume mirroring</dt>
          <dd>Live (mic on device)</dd>
        </div>
        {hasGoals && (
          <div>
            <dt>Goals you set</dt>
            <dd>{config.goals.length}</dd>
          </div>
        )}
        {hasOffLimits && (
          <div>
            <dt>Off-limit phrases saved</dt>
            <dd>{config.offLimits.length}</dd>
          </div>
        )}
      </dl>

      {hasGoals && (
        <section className="mirror-post__reminders" aria-labelledby="mirror-post-goals-heading">
          <h3 id="mirror-post-goals-heading">Your intentions</h3>
          <ul className="mirror-post__goals">
            {config.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </section>
      )}

      {hasOffLimits && (
        <p className="mirror-post__note">
          Off-limit phrases stayed on this device. Phrase detection is not live; any boundary toast during
          the session was a timed preview only.
        </p>
      )}

      <section className="mirror-post__card mirror-post__card--later">
        <p className="eyebrow">Not in this build</p>
        <p>
          Timeline, trap callouts, and alignment notes need speech understanding we have not shipped yet.
        </p>
      </section>

      <button className="mobile-primary-button" onClick={onNewSession} type="button">
        Begin Mirror again
      </button>
    </div>
  );
}

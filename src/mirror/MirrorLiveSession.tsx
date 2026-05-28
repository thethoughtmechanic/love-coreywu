import { useEffect, useState } from 'react';
import { Square } from 'lucide-react';
import { DEMO_BOUNDARY_DELAY_MS } from '../data/mirrorPresets';
import type { MirrorSessionConfig } from './MirrorTab';
import { useMicAmplitude, type VolumeZone } from './useMicAmplitude';

type Props = {
  config: MirrorSessionConfig;
  onEnd: () => void;
  onCancel: () => void;
};

const zoneLabels: Record<VolumeZone, string> = {
  quiet: 'Quiet: ambassadors have room',
  elevated: 'Elevated: slow down',
  loud: 'Loud: primitives may be driving',
};

export function MirrorLiveSession({ config, onEnd, onCancel }: Props) {
  const micActive = true;
  const { level, zone, status, errorMessage } = useMicAmplitude(micActive);
  const [demoToast, setDemoToast] = useState<string | null>(null);

  useEffect(() => {
    if (config.offLimits.length === 0) return undefined;

    const timer = window.setTimeout(() => {
      const phrase = config.offLimits[0];
      setDemoToast(
        `Preview only: "${phrase}" is on your off-limits list, but Mirror is not transcribing speech yet. Real phrase detection comes later.`,
      );
    }, DEMO_BOUNDARY_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [config.offLimits]);

  if (status === 'denied' || status === 'unsupported') {
    return (
      <div className="mirror-live mirror-live--blocked">
        <div className="mirror-live__blocked-copy">
          <p className="eyebrow">Microphone</p>
          <h2>Cannot start the mirror</h2>
          <p>{errorMessage}</p>
          <button className="mobile-primary-button" onClick={onCancel} type="button">
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-live="polite"
      className={`mirror-live mirror-live--${zone}`}
      data-zone={zone}
    >
      <div className="mirror-live__hud">
        {config.chapterLabel && (
          <p className="mirror-live__activity-meta">{config.chapterLabel}</p>
        )}
        {config.activityTitle && (
          <p className="mirror-live__activity-title">{config.activityTitle}</p>
        )}
        <p className="mirror-live__status">
          {status === 'requesting' ? 'Requesting microphone…' : zoneLabels[zone]}
        </p>
        <div aria-hidden="true" className="mirror-live__meter">
          <span style={{ width: `${Math.min(100, Math.round(level * 140))}%` }} />
        </div>
        {config.goals.length > 0 && (
          <ul className="mirror-live__goals">
            {config.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        )}
      </div>

      {demoToast && (
        <div className="mirror-demo-toast" role="status">
          <p className="mirror-demo-toast__tag">Coming later</p>
          <p>{demoToast}</p>
          <button onClick={() => setDemoToast(null)} type="button">
            Dismiss
          </button>
        </div>
      )}

      <button
        aria-label="End mirror session"
        className="mirror-live__end"
        onClick={onEnd}
        type="button"
      >
        <Square size={16} />
        End session
      </button>
    </div>
  );
}

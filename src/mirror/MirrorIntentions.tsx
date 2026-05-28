import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { MIRROR_INTENT_PRESETS } from '../data/mirrorPresets';
import type { MirrorSessionConfig } from './MirrorTab';

type Props = {
  activityTitle?: string;
  chapterLabel?: string;
  initialGoals: string[];
  initialOffLimits: string[];
  onBack: () => void;
  onBegin: (config: MirrorSessionConfig) => void;
};

const MAX_GOALS = 3;

function buildConfig(
  selectedGoals: string[],
  offLimitA: string,
  offLimitB: string,
  activityTitle?: string,
  chapterLabel?: string,
): MirrorSessionConfig {
  return {
    goals: selectedGoals,
    offLimits: [offLimitA.trim(), offLimitB.trim()].filter(Boolean),
    activityTitle,
    chapterLabel,
  };
}

export function MirrorIntentions({
  activityTitle,
  chapterLabel,
  initialGoals,
  initialOffLimits,
  onBack,
  onBegin,
}: Props) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialGoals.slice(0, MAX_GOALS));
  const [offLimitA, setOffLimitA] = useState(initialOffLimits[0] ?? '');
  const [offLimitB, setOffLimitB] = useState(initialOffLimits[1] ?? '');

  const toggleGoal = (goal: string) => {
    setSelectedGoals((current) => {
      if (current.includes(goal)) {
        return current.filter((item) => item !== goal);
      }
      if (current.length >= MAX_GOALS) return current;
      return [...current, goal];
    });
  };

  const begin = () =>
    onBegin(buildConfig(selectedGoals, offLimitA, offLimitB, activityTitle, chapterLabel));

  return (
    <div className="mirror-intentions-panel">
      <div className="mirror-intentions-panel__toolbar">
        <button className="mobile-detail__back" onClick={onBack} type="button">
          <ArrowLeft aria-hidden="true" size={18} />
          Back
        </button>
      </div>

      <header className="mirror-intentions-panel__header">
        <h2>Session intentions</h2>
        <p>
          Optional. Goals show as reminders during the talk. Off-limit phrases stay on this device
          only; word detection is not live yet.
        </p>
      </header>

      <section aria-labelledby="mirror-goals-heading" className="mirror-section">
        <h3 id="mirror-goals-heading">Session goals</h3>
        <p className="mirror-section__hint">
          Pick up to {MAX_GOALS} if you want a north star visible while you talk
        </p>
        <ul className="mirror-checklist">
          {MIRROR_INTENT_PRESETS.map((preset) => {
            const checked = selectedGoals.includes(preset);
            const disabled = !checked && selectedGoals.length >= MAX_GOALS;

            return (
              <li key={preset}>
                <label className={`mirror-check ${checked ? 'is-checked' : ''} ${disabled ? 'is-disabled' : ''}`}>
                  <input
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleGoal(preset)}
                    type="checkbox"
                  />
                  <span>{preset}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="mirror-offlimits-heading" className="mirror-section">
        <h3 id="mirror-offlimits-heading">Off-limit phrases</h3>
        <p className="mirror-section__hint">
          Stored locally. A preview toast may appear after ~18s to show what detection could feel
          like; it is not listening to your words yet.
        </p>
        <div className="mirror-offlimits">
          <label>
            <span className="mirror-offlimits__label">Phrase 1</span>
            <input
              maxLength={80}
              onChange={(event) => setOffLimitA(event.target.value)}
              placeholder='e.g. "You always…"'
              type="text"
              value={offLimitA}
            />
          </label>
          <label>
            <span className="mirror-offlimits__label">Phrase 2</span>
            <input
              maxLength={80}
              onChange={(event) => setOffLimitB(event.target.value)}
              placeholder='e.g. "That vacation in 2024"'
              type="text"
              value={offLimitB}
            />
          </label>
        </div>
      </section>

      <button className="mobile-primary-button mirror-intentions-panel__save" onClick={begin} type="button">
        Save and start session
      </button>
    </div>
  );
}

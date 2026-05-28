import { useCallback, useEffect, useState } from 'react';
import { MirrorIntent } from './MirrorIntent';
import { MirrorLiveSession } from './MirrorLiveSession';
import { MirrorPostSession } from './MirrorPostSession';
import {
  getMirrorGoalsForChapter,
  mirrorStorageKeys,
  type MirrorLaunchContext,
} from '../data/mirrorPresets';

export type MirrorPhase = 'intent' | 'live' | 'post';

export type MirrorSessionConfig = {
  goals: string[];
  offLimits: string[];
  activityTitle?: string;
  chapterLabel?: string;
};

function readStoredGoals(): string[] {
  try {
    const raw = localStorage.getItem(mirrorStorageKeys.goals);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function readStoredOffLimits(): string[] {
  try {
    const raw = localStorage.getItem(mirrorStorageKeys.offLimits);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

type MirrorTabProps = {
  launchContext?: MirrorLaunchContext | null;
  onPhaseChange?: (phase: MirrorPhase) => void;
};

function buildLaunchConfig(
  launchContext: MirrorLaunchContext | null | undefined,
  storedGoals: string[],
  storedOffLimits: string[],
): MirrorSessionConfig {
  if (!launchContext) {
    return { goals: storedGoals, offLimits: storedOffLimits };
  }

  const suggestedGoals = getMirrorGoalsForChapter(launchContext.chapterId);

  return {
    goals: suggestedGoals.length > 0 ? suggestedGoals : storedGoals,
    offLimits: storedOffLimits,
    activityTitle: launchContext.activityTitle,
    chapterLabel: `Chapter ${launchContext.chapterNumber}: ${launchContext.chapterTitle}`,
  };
}

/**
 * Mirror: real mic amplitude → color field.
 * Optional goals/off-limits: localStorage + HUD reminders; boundary toast is timed demo only.
 * Deferred: STT, recording, LLM post-summary.
 */
export function MirrorTab({ launchContext = null, onPhaseChange }: MirrorTabProps = {}) {
  const [phase, setPhase] = useState<MirrorPhase>('intent');
  const [config, setConfig] = useState<MirrorSessionConfig>(() =>
    buildLaunchConfig(launchContext, readStoredGoals(), readStoredOffLimits()),
  );
  const [sessionStartedAt, setSessionStartedAt] = useState<number | null>(null);

  useEffect(() => {
    setSessionStartedAt(null);
    setPhase('intent');
    setConfig(buildLaunchConfig(launchContext, readStoredGoals(), readStoredOffLimits()));
  }, [launchContext]);

  useEffect(() => {
    localStorage.setItem(mirrorStorageKeys.goals, JSON.stringify(config.goals));
    localStorage.setItem(mirrorStorageKeys.offLimits, JSON.stringify(config.offLimits));
  }, [config.goals, config.offLimits]);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [onPhaseChange, phase]);

  const beginSession = useCallback((next: MirrorSessionConfig) => {
    setConfig(next);
    setSessionStartedAt(Date.now());
    setPhase('live');
  }, []);

  const endSession = useCallback(() => {
    setPhase('post');
  }, []);

  const restart = useCallback(() => {
    setSessionStartedAt(null);
    setPhase('intent');
  }, []);

  const cancelSession = useCallback(() => {
    setSessionStartedAt(null);
    setPhase('intent');
  }, []);

  if (phase === 'live') {
    return (
      <MirrorLiveSession
        config={config}
        onCancel={cancelSession}
        onEnd={endSession}
      />
    );
  }

  if (phase === 'post') {
    return (
      <MirrorPostSession
        config={config}
        durationMs={sessionStartedAt ? Date.now() - sessionStartedAt : 0}
        onNewSession={restart}
      />
    );
  }

  return (
    <MirrorIntent
      activityTitle={config.activityTitle}
      chapterLabel={config.chapterLabel}
      initialGoals={config.goals}
      initialOffLimits={config.offLimits}
      onBegin={beginSession}
    />
  );
}

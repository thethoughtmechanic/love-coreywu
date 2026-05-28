/** Mirror intent presets, aligned with Wired for Love / fight-well language (Project Mirror MVP). */
export const MIRROR_INTENT_PRESETS = [
  'Find a compromise without exploding',
  'Express frustration without fixing or lecturing',
  'Listen first: hold the bond before the point',
  'Fight well so we both can win',
  'Protect the couple bubble in this talk',
  'Repair fast if volume or tone spikes',
] as const;

export type MirrorIntentPreset = (typeof MIRROR_INTENT_PRESETS)[number];

export const mirrorStorageKeys = {
  goals: 'wfl-mirror-goals-v1',
  offLimits: 'wfl-mirror-off-limits-v1',
} as const;

/** Demo boundary toast: hackathon mock only; not STT. */
export const DEMO_BOUNDARY_DELAY_MS = 18_000;

export type MirrorLaunchContext = {
  chapterId: string;
  chapterNumber: string;
  chapterTitle: string;
  activityTitle: string;
};

/** Suggested session goals per chapter practice, drawn from Tatkin-aligned presets. */
export const chapterMirrorGoals: Partial<Record<string, MirrorIntentPreset[]>> = {
  'couple-bubble': ['Protect the couple bubble in this talk'],
  'warring-loving-brain': ['Repair fast if volume or tone spikes'],
  'know-your-partner': ['Listen first: hold the bond before the point'],
  'becoming-experts': ['Express frustration without fixing or lecturing'],
  'launchings-landings': [
    'Protect the couple bubble in this talk',
    'Listen first: hold the bond before the point',
  ],
  'go-to-people': ['Protect the couple bubble in this talk'],
  'protecting-bubble': ['Protect the couple bubble in this talk'],
  'fighting-well': ['Fight well so we both can win', 'Find a compromise without exploding'],
  'eye-contact': ['Listen first: hold the bond before the point'],
  'partnership-heals': [
    'Express frustration without fixing or lecturing',
    'Repair fast if volume or tone spikes',
  ],
};

export function getMirrorGoalsForChapter(chapterId: string): string[] {
  return chapterMirrorGoals[chapterId]?.slice(0, 3) ?? [];
}

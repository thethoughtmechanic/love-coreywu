import type { VisualType } from './wiredForLove';

export type ArtifactKind =
  | 'couple-bubble-shield'
  | 'car-dashboard'
  | 'style-manual'
  | 'expert-cards'
  | 'door-lamp'
  | 'go-to-tether'
  | 'party-thirds'
  | 'same-side-table'
  | 'eye-gaze'
  | 'healing-hands';

export type ArtifactPlacement = 'hero';

export type ArtifactVariant = ArtifactPlacement | 'inline';

export type ChapterArtifactSpec = {
  kind: ArtifactKind;
  placement: ArtifactPlacement[];
  label: string;
  showLabel?: boolean;
};

const byChapterId: Record<string, ChapterArtifactSpec[]> = {
  'couple-bubble': [
    {
      kind: 'couple-bubble-shield',
      placement: ['hero'],
      label: 'Alliance before outsiders',
    },
  ],
  'warring-loving-brain': [
    {
      kind: 'car-dashboard',
      placement: ['hero'],
      label: 'Franklin and Leia, before words land',
    },
  ],
  'know-your-partner': [
    {
      kind: 'style-manual',
      placement: ['hero'],
      label: 'Owner manual, not caricature',
    },
  ],
  'becoming-experts': [
    {
      kind: 'expert-cards',
      placement: ['hero'],
      label: 'Vulnerability paired with antidote',
    },
  ],
  'launchings-landings': [
    {
      kind: 'door-lamp',
      placement: ['hero'],
      label: 'Door first, then the day',
    },
  ],
  'go-to-people': [
    {
      kind: 'go-to-tether',
      placement: ['hero'],
      label: 'First call, full attention',
    },
  ],
  'protecting-bubble': [
    {
      kind: 'party-thirds',
      placement: ['hero'],
      label: 'Number one in the room',
    },
  ],
  'fighting-well': [
    {
      kind: 'same-side-table',
      placement: ['hero'],
      label: 'Problem between you, not inside either',
    },
  ],
  'eye-contact': [
    {
      kind: 'eye-gaze',
      placement: ['hero'],
      label: 'Ambassadors engage up close',
    },
  ],
  'partnership-heals': [
    {
      kind: 'healing-hands',
      placement: ['hero'],
      label: 'Touch as daily medicine',
    },
  ],
};

const byVisualType: Partial<Record<VisualType, ArtifactKind>> = {
  bubble: 'couple-bubble-shield',
  'primitives-ambassadors': 'car-dashboard',
  'attachment-triad': 'style-manual',
  'expert-antidotes': 'expert-cards',
  'ritual-timeline': 'door-lamp',
  'go-to-tether': 'go-to-tether',
  thirds: 'party-thirds',
  'fight-well': 'same-side-table',
  'eye-contact': 'eye-gaze',
  'healing-touch': 'healing-hands',
};

export const ARTIFACT_PLACEMENTS: ArtifactPlacement[] = ['hero'];

export function getChapterArtifacts(
  chapterId: string,
  visualType: VisualType,
): ChapterArtifactSpec[] {
  const explicit = byChapterId[chapterId];
  if (explicit?.length) {
    return explicit;
  }

  const kind = byVisualType[visualType];
  if (!kind) {
    return [];
  }

  return [{ kind, placement: ['hero'], label: '' }];
}

export function getArtifactForPlacement(
  chapterId: string,
  visualType: VisualType,
  placement: ArtifactPlacement,
): ChapterArtifactSpec | undefined {
  return getChapterArtifacts(chapterId, visualType).find((spec) =>
    spec.placement.includes(placement),
  );
}

export function getChapterArtifactMap(
  chapterId: string,
  visualType: VisualType,
): Partial<Record<ArtifactPlacement, ChapterArtifactSpec>> {
  const map: Partial<Record<ArtifactPlacement, ChapterArtifactSpec>> = {};

  for (const spec of getChapterArtifacts(chapterId, visualType)) {
    for (const placement of spec.placement) {
      if (!map[placement]) {
        map[placement] = spec;
      }
    }
  }

  return map;
}

export function shouldShowArtifactLabel(
  spec: ChapterArtifactSpec,
  variant: ArtifactVariant,
): boolean {
  if (spec.showLabel === false) {
    return false;
  }

  if (spec.showLabel === true) {
    return Boolean(spec.label);
  }

  return variant === 'hero' && Boolean(spec.label);
}

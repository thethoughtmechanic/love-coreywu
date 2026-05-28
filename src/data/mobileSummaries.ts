import { chapters, type Chapter } from './wiredForLove';

export type LearnIconKey =
  | 'shield'
  | 'brain'
  | 'compass'
  | 'heart-handshake'
  | 'sun-moon'
  | 'link'
  | 'users'
  | 'handshake'
  | 'eye'
  | 'heart-pulse';

export type LearnPageSection = {
  label: string;
  body?: string;
  bullets?: string[];
};

export type LearnPage = {
  title: string;
  sections: LearnPageSection[];
};

export type LearnChapterMobile = {
  chapterId: string;
  number: string;
  title: string;
  rememberThis: string;
  icon: LearnIconKey;
  pages: LearnPage[];
};

const chapterIcons: Record<string, LearnIconKey> = {
  'couple-bubble': 'shield',
  'warring-loving-brain': 'brain',
  'know-your-partner': 'compass',
  'becoming-experts': 'heart-handshake',
  'launchings-landings': 'sun-moon',
  'go-to-people': 'link',
  'protecting-bubble': 'users',
  'fighting-well': 'handshake',
  'eye-contact': 'eye',
  'partnership-heals': 'heart-pulse',
};

export function buildLearnPages(chapter: Chapter): LearnPage[] {
  const pages: LearnPage[] = [
    {
      title: 'Core teaching',
      sections: [
        { label: 'Principle', body: chapter.principle },
        { label: 'Remember this', body: chapter.rememberThis },
        { label: 'What it teaches', bullets: chapter.whatItTeaches },
      ],
    },
    {
      title: 'Tatkin frame',
      sections: [{ label: 'How Tatkin puts it', body: chapter.tatkinFrame }],
    },
    {
      title: 'In your relationship',
      sections: [
        {
          label: chapter.bookStory.label,
          body: `${chapter.bookStory.setup} ${chapter.bookStory.tatkinPoint}`,
        },
        { label: 'Recognize it', bullets: chapter.recognizeIt },
        { label: 'Partner move', body: chapter.partnerMove },
      ],
    },
  ];

  return pages;
}

export function buildLearnChapters(source: Chapter[] = chapters): LearnChapterMobile[] {
  return source.map((chapter) => ({
    chapterId: chapter.id,
    number: chapter.number,
    title: chapter.title,
    rememberThis: chapter.rememberThis,
    icon: chapterIcons[chapter.id] ?? 'shield',
    pages: buildLearnPages(chapter),
  }));
}

export const learnChapters = buildLearnChapters();

export type PracticeEntry = {
  chapterId: string;
  chapterNumber: string;
  chapterTitle: string;
  title: string;
  whenToUse: string;
  stepCount: number;
};

export function buildPracticeList(source: Chapter[] = chapters): PracticeEntry[] {
  return source.map((chapter) => ({
    chapterId: chapter.id,
    chapterNumber: chapter.number,
    chapterTitle: chapter.title,
    title: chapter.practice.title,
    whenToUse: chapter.practice.whenToUse,
    stepCount: chapter.practice.steps.length,
  }));
}

export const practiceList = buildPracticeList();

export function practiceOfTheDay(source: Chapter[] = chapters): PracticeEntry {
  const dayIndex = new Date().getDate() % source.length;
  return buildPracticeList(source)[dayIndex];
}

export type PracticeTheme =
  | 'bubble'
  | 'brain'
  | 'style'
  | 'ritual'
  | 'conflict'
  | 'touch';

export const practiceThemeLabels: Record<PracticeTheme, string> = {
  bubble: 'Bubble',
  brain: 'Brain',
  style: 'Style',
  ritual: 'Ritual',
  conflict: 'Conflict',
  touch: 'Touch',
};

export const chapterPracticeThemes: Partial<Record<string, PracticeTheme[]>> = {
  'couple-bubble': ['bubble'],
  'warring-loving-brain': ['brain'],
  'know-your-partner': ['style'],
  'becoming-experts': ['style'],
  'launchings-landings': ['ritual'],
  'protecting-bubble': ['bubble'],
  'fighting-well': ['conflict'],
  'partnership-heals': ['touch'],
};

export function chapterMatchesTheme(chapterId: string, theme: PracticeTheme): boolean {
  return chapterPracticeThemes[chapterId]?.includes(theme) ?? false;
}

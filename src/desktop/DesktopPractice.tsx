import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, CircleDot, ScanEye } from 'lucide-react';
import {
  chapterMatchesTheme,
  chapterPracticeThemes,
  practiceThemeLabels,
  type PracticeTheme,
} from '../data/mobileSummaries';
import { chapters } from '../data/wiredForLove';

type DesktopPracticeProps = {
  completed: Set<string>;
  onOpenChapter: (chapterId: string) => void;
  onStartMirror: (chapterId: string) => void;
  onToggleComplete: (chapterId: string) => void;
};

const themeOrder: PracticeTheme[] = [
  'bubble',
  'brain',
  'style',
  'ritual',
  'conflict',
  'touch',
];

export function DesktopPractice({
  completed,
  onOpenChapter,
  onStartMirror,
  onToggleComplete,
}: DesktopPracticeProps) {
  const [activeTheme, setActiveTheme] = useState<PracticeTheme | 'all'>('all');

  const filteredChapters = useMemo(() => {
    if (activeTheme === 'all') return chapters;
    return chapters.filter((chapter) => chapterPracticeThemes[chapter.id]?.includes(activeTheme));
  }, [activeTheme]);

  const availableThemes = useMemo(
    () => themeOrder.filter((theme) => chapters.some((chapter) => chapterMatchesTheme(chapter.id, theme))),
    [],
  );

  return (
    <>
      <section className="practice-hero">
        <div className="practice-hero__copy">
          <p className="eyebrow">Practice</p>
          <h2>Exercises from the book, grouped by chapter</h2>
          <p>
            Ten Tatkin practices from the chapter spine. Use when the moment matches, not as homework.
            Exercises stay in each chapter too; this view gathers them in one place.
          </p>
        </div>
        <div className="practice-hero__meta">
          <span>{chapters.length} exercises</span>
          <span>{completed.size} marked tried</span>
        </div>
      </section>

      {availableThemes.length > 0 && (
        <div aria-label="Filter by theme" className="practice-filters" role="group">
          <button
            aria-pressed={activeTheme === 'all'}
            className={`practice-filter ${activeTheme === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveTheme('all')}
            type="button"
          >
            All
          </button>
          {availableThemes.map((theme) => (
            <button
              aria-pressed={activeTheme === theme}
              className={`practice-filter ${activeTheme === theme ? 'is-active' : ''}`}
              key={theme}
              onClick={() => setActiveTheme(theme)}
              type="button"
            >
              {practiceThemeLabels[theme]}
            </button>
          ))}
        </div>
      )}

      <div className="practice-grid">
        {filteredChapters.map((chapter) => {
          const isComplete = completed.has(chapter.id);
          const themes = chapterPracticeThemes[chapter.id];

          return (
            <article className="practice-card" key={chapter.id}>
              <header className="practice-card__header">
                <div className="practice-card__chapter">
                  <span className="practice-card__number">Chapter {chapter.number}</span>
                  <strong>{chapter.title}</strong>
                </div>
                {themes && themes.length > 0 && (
                  <div aria-label="Themes" className="practice-card__tags">
                    {themes.map((theme) => (
                      <span className="practice-card__tag" key={theme}>
                        {practiceThemeLabels[theme]}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <h3 className="practice-card__title">{chapter.practice.title}</h3>
              <p className="practice-card__when">{chapter.practice.whenToUse}</p>

              <ol className="practice-steps practice-steps--card">
                {chapter.practice.steps.map((step, index) => (
                  <li key={step}>
                    <span className="practice-steps__number">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="practice-card__actions">
                <button
                  className="practice-card__mirror"
                  onClick={() => onStartMirror(chapter.id)}
                  type="button"
                >
                  <ScanEye aria-hidden="true" size={16} />
                  Practice together
                </button>
                <button
                  className="practice-card__chapter-link"
                  onClick={() => onOpenChapter(chapter.id)}
                  type="button"
                >
                  Read chapter context
                  <ArrowUpRight aria-hidden="true" size={16} />
                </button>
                <button
                  className={`practice-card__complete ${isComplete ? 'is-done' : ''}`}
                  onClick={() => onToggleComplete(chapter.id)}
                  type="button"
                >
                  {isComplete ? <Check size={16} /> : <CircleDot size={16} />}
                  {isComplete ? 'Marked as tried' : 'Mark as tried'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

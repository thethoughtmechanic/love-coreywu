import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { chapters } from '../data/wiredForLove';
import {
  chapterMatchesTheme,
  chapterPracticeThemes,
  practiceList,
  practiceOfTheDay,
  practiceThemeLabels,
  type PracticeEntry,
  type PracticeTheme,
} from '../data/mobileSummaries';

const themeOrder: PracticeTheme[] = ['bubble', 'brain', 'style', 'ritual', 'conflict', 'touch'];

function PracticeDetail({
  chapterId,
  onBack,
}: {
  chapterId: string;
  onBack: () => void;
}) {
  const chapter = chapters.find((item) => item.id === chapterId);
  if (!chapter) return null;

  const { practice } = chapter;

  return (
    <div className="mobile-screen mobile-screen--practice">
      <header className="mobile-screen__nav">
        <button
          aria-label="Back to practice list"
          className="mobile-screen__back"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={22} strokeWidth={2} />
          <span>Practice</span>
        </button>
        <span className="mobile-screen__nav-label">Ch. {chapter.number}</span>
      </header>

      <div className="mobile-screen__scroll">
        <header className="mobile-screen__hero mobile-screen__hero--compact">
          <p className="eyebrow">Chapter {chapter.number}</p>
          <h2 className="mobile-screen__title">{practice.title}</h2>
          <p className="mobile-screen__subtitle">{chapter.title}</p>
        </header>

        <article className="mobile-card">
          <div className="mobile-card__body">
            <section className="practice-detail__block">
              <h3>When to use it</h3>
              <p>{practice.whenToUse}</p>
            </section>

            <section className="practice-detail__block">
              <h3>Steps</h3>
              <ol className="practice-detail__steps">
                {practice.steps.map((step, index) => (
                  <li key={step}>
                    <span className="practice-detail__step-num">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

function PracticeRow({
  entry,
  onOpen,
}: {
  entry: PracticeEntry;
  onOpen: (chapterId: string) => void;
}) {
  const themes = chapterPracticeThemes[entry.chapterId];

  return (
    <li>
      <button className="practice-row practice-row--compact" onClick={() => onOpen(entry.chapterId)} type="button">
        <span className="practice-row__main">
          <span className="practice-row__chapter">Ch. {entry.chapterNumber}</span>
          <strong>{entry.title}</strong>
          {themes && themes.length > 0 && (
            <span className="practice-row__themes">
              {themes.map((theme) => practiceThemeLabels[theme]).join(' · ')}
            </span>
          )}
        </span>
        <span className="practice-row__trail">
          <span className="practice-row__steps">{entry.stepCount} steps</span>
          <ChevronRight aria-hidden="true" size={18} />
        </span>
      </button>
    </li>
  );
}

type MobilePracticeProps = {
  onDetailChange?: (inDetail: boolean) => void;
};

export function MobilePractice({ onDetailChange }: MobilePracticeProps) {
  const daily = useMemo(() => practiceOfTheDay(), []);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<PracticeTheme | 'all'>('all');

  useEffect(() => {
    onDetailChange?.(Boolean(detailId));
    return () => onDetailChange?.(false);
  }, [detailId, onDetailChange]);

  const availableThemes = useMemo(
    () => themeOrder.filter((theme) => practiceList.some((entry) => chapterMatchesTheme(entry.chapterId, theme))),
    [],
  );

  const filteredList = useMemo(() => {
    if (activeTheme === 'all') return practiceList;
    return practiceList.filter((entry) => chapterMatchesTheme(entry.chapterId, activeTheme));
  }, [activeTheme]);

  const sections = useMemo(() => {
    if (activeTheme !== 'all') return null;

    const grouped = themeOrder
      .map((theme) => ({
        theme,
        label: practiceThemeLabels[theme],
        entries: practiceList.filter((entry) => chapterMatchesTheme(entry.chapterId, theme)),
      }))
      .filter((section) => section.entries.length > 0);

    const themedIds = new Set(grouped.flatMap((section) => section.entries.map((entry) => entry.chapterId)));
    const unthemed = practiceList.filter((entry) => !themedIds.has(entry.chapterId));

    return { grouped, unthemed };
  }, [activeTheme]);

  if (detailId) {
    return <PracticeDetail chapterId={detailId} onBack={() => setDetailId(null)} />;
  }

  const open = (chapterId: string) => setDetailId(chapterId);

  return (
    <div className="mobile-practice">
      <header className="mobile-panel__header mobile-panel__header--compact">
        <p className="eyebrow">Practice</p>
        <h2>When the moment fits</h2>
        <p className="mobile-panel__lead">
          Ten Tatkin exercises from the chapter spine. Use when the situation matches, not as
          homework.
        </p>
      </header>

      <section aria-label="Today's practice" className="practice-daily practice-daily--hero">
        <p className="eyebrow">Today&apos;s practice</p>
        <strong>{daily.title}</strong>
        <p className="practice-daily__when">{daily.whenToUse}</p>
        <button className="practice-daily__start" onClick={() => open(daily.chapterId)} type="button">
          Open · Ch. {daily.chapterNumber}
        </button>
      </section>

      {availableThemes.length > 0 && (
        <div aria-label="Filter by theme" className="practice-filters practice-filters--mobile" role="group">
          <button
            className={`practice-filter ${activeTheme === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveTheme('all')}
            type="button"
          >
            All
          </button>
          {availableThemes.map((theme) => (
            <button
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

      {sections ? (
        <div className="practice-sections">
          {sections.grouped.map((section) => (
            <section className="practice-section" key={section.theme}>
              <h3 className="practice-section__title">{section.label}</h3>
              <ul className="practice-section__list">
                {section.entries.map((entry) => (
                  <PracticeRow entry={entry} key={entry.chapterId} onOpen={open} />
                ))}
              </ul>
            </section>
          ))}
          {sections.unthemed.length > 0 && (
            <section className="practice-section">
              <h3 className="practice-section__title">Also in the book</h3>
              <ul className="practice-section__list">
                {sections.unthemed.map((entry) => (
                  <PracticeRow entry={entry} key={entry.chapterId} onOpen={open} />
                ))}
              </ul>
            </section>
          )}
        </div>
      ) : (
        <ul className="practice-section__list practice-section__list--flat">
          {filteredList.map((entry) => (
            <PracticeRow entry={entry} key={entry.chapterId} onOpen={open} />
          ))}
        </ul>
      )}
    </div>
  );
}

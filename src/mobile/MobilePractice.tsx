import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
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
    <div className="mobile-detail mobile-detail--practice">
      <div className="mobile-detail__toolbar">
        <button className="mobile-detail__back" onClick={onBack} type="button">
          <ArrowLeft aria-hidden="true" size={18} />
          Back
        </button>
        <p className="mobile-detail__meta">
          Ch. {chapter.number} · {chapter.title}
        </p>
      </div>

      <div className="mobile-detail__body">
        <h2 className="mobile-detail__title">{practice.title}</h2>

        <section className="practice-detail__block">
          <h3>What it is</h3>
          <p>
            <strong>{practice.title}</strong>. {chapter.subtitle}. From Tatkin&apos;s chapter{' '}
            {chapter.number} exercise spine.
          </p>
        </section>

        <section className="practice-detail__block">
          <h3>Why do it</h3>
          <p>{practice.whenToUse}</p>
        </section>

        <section className="practice-detail__block">
          <h3>How</h3>
          <ol>
            {practice.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
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

export function MobilePractice() {
  const daily = useMemo(() => practiceOfTheDay(), []);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<PracticeTheme | 'all'>('all');

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
          Ten Tatkin exercises from the chapter spine — use when the situation matches, not as
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

import { useCallback, useEffect, useState, type TouchEvent } from 'react';
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Compass,
  Eye,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Link2,
  Shield,
  SunMoon,
  Users,
} from 'lucide-react';
import {
  learnChapters,
  type LearnChapterMobile,
  type LearnIconKey,
  type LearnPageSection,
} from '../data/mobileSummaries';

const iconMap = {
  shield: Shield,
  brain: Brain,
  compass: Compass,
  'heart-handshake': HeartHandshake,
  'sun-moon': SunMoon,
  link: Link2,
  handshake: Handshake,
  eye: Eye,
  'heart-pulse': HeartPulse,
  users: Users,
} satisfies Record<LearnIconKey, typeof Shield>;

function ChapterIcon({ icon }: { icon: LearnIconKey }) {
  const Icon = iconMap[icon];
  return <Icon aria-hidden="true" size={22} strokeWidth={1.75} />;
}

function SectionBlock({ section }: { section: LearnPageSection }) {
  const isSteps = section.label === 'Steps';

  return (
    <section className="learn-detail__section">
      <h3>{section.label}</h3>
      {section.body && <p>{section.body}</p>}
      {section.bullets && (
        <ul className={isSteps ? 'learn-detail__steps' : undefined}>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function LearnDetail({
  chapter,
  onBack,
}: {
  chapter: LearnChapterMobile;
  onBack: () => void;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const page = chapter.pages[pageIndex];
  const isFirst = pageIndex === 0;
  const isLast = pageIndex === chapter.pages.length - 1;

  const goNext = useCallback(() => {
    setPageIndex((current) => Math.min(current + 1, chapter.pages.length - 1));
  }, [chapter.pages.length]);

  const goPrev = useCallback(() => {
    setPageIndex((current) => Math.max(current - 1, 0));
  }, []);

  const onTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.changedTouches[0];
    (event.currentTarget as HTMLElement).dataset.touchX = String(touch.clientX);
  }, []);

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      const startX = Number((event.currentTarget as HTMLElement).dataset.touchX);
      const endX = event.changedTouches[0].clientX;
      const delta = endX - startX;
      if (delta < -48) goNext();
      if (delta > 48) goPrev();
    },
    [goNext, goPrev],
  );

  return (
    <div className="mobile-screen mobile-screen--learn">
      <header className="mobile-screen__nav">
        <button
          aria-label="Back to chapters"
          className="mobile-screen__back"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={22} strokeWidth={2} />
          <span>Learn</span>
        </button>
        <span className="mobile-screen__nav-label">Ch. {chapter.number}</span>
      </header>

      <div
        className="mobile-screen__scroll"
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        <header className="mobile-screen__hero">
          <span className="learn-grid__icon learn-grid__icon--hero">
            <ChapterIcon icon={chapter.icon} />
          </span>
          <p className="eyebrow">Chapter {chapter.number}</p>
          <h2 className="mobile-screen__title">{chapter.title}</h2>
          <p className="mobile-screen__remember">{chapter.rememberThis}</p>
        </header>

        <article aria-labelledby="learn-page-heading" className="mobile-card">
          <div className="mobile-card__meta">
            <span className="mobile-card__page">
              {pageIndex + 1} of {chapter.pages.length}
            </span>
            <span aria-hidden="true" className="mobile-card__dots">
              {chapter.pages.map((_, index) => (
                <span className={index === pageIndex ? 'is-active' : ''} key={index} />
              ))}
            </span>
          </div>
          <h3 className="mobile-card__heading" id="learn-page-heading">
            {page.title}
          </h3>
          <div className="mobile-card__body">
            {page.sections.map((section) => (
              <SectionBlock key={section.label} section={section} />
            ))}
          </div>
        </article>
      </div>

      <footer className="mobile-screen__pager">
        <button
          aria-label="Previous page"
          className="mobile-screen__pager-btn mobile-screen__pager-btn--prev"
          disabled={isFirst}
          onClick={goPrev}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={20} strokeWidth={2} />
        </button>
        <p className="mobile-screen__pager-label">
          {page.title}
        </p>
        {isLast ? (
          <button
            className="mobile-screen__pager-btn mobile-screen__pager-btn--next mobile-screen__pager-btn--done"
            onClick={onBack}
            type="button"
          >
            Done
          </button>
        ) : (
          <button
            aria-label="Next page"
            className="mobile-screen__pager-btn mobile-screen__pager-btn--next"
            onClick={goNext}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={20} strokeWidth={2} />
          </button>
        )}
      </footer>
    </div>
  );
}

type MobileLearnProps = {
  onDetailChange?: (inDetail: boolean) => void;
};

export function MobileLearn({ onDetailChange }: MobileLearnProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = learnChapters.find((chapter) => chapter.chapterId === selectedId);

  useEffect(() => {
    onDetailChange?.(Boolean(selected));
    return () => onDetailChange?.(false);
  }, [onDetailChange, selected]);

  if (selected) {
    return <LearnDetail chapter={selected} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="mobile-learn">
      <header className="mobile-panel__header">
        <p className="eyebrow">Learn</p>
        <h2>Key concepts</h2>
        <p className="mobile-panel__lead">
          Ten Tatkin chapters on one screen. Tap a card for a short read through the book&apos;s
          spine.
        </p>
      </header>

      <ul className="learn-grid">
        {learnChapters.map((chapter) => (
          <li key={chapter.chapterId}>
            <button
              className="learn-grid__card"
              onClick={() => setSelectedId(chapter.chapterId)}
              type="button"
            >
              <span className="learn-grid__icon">
                <ChapterIcon icon={chapter.icon} />
              </span>
              <span className="learn-grid__number">Ch. {chapter.number}</span>
              <strong>{chapter.title}</strong>
              <span className="learn-grid__remember">{chapter.rememberThis}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

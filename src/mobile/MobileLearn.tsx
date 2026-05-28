import { useCallback, useState, type TouchEvent } from 'react';
import {
  ArrowLeft,
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
    <div className="mobile-detail mobile-detail--learn">
      <div className="mobile-detail__toolbar">
        <button className="mobile-detail__back" onClick={onBack} type="button">
          <ArrowLeft aria-hidden="true" size={18} />
          Back
        </button>
        <p className="mobile-detail__meta">
          Ch. {chapter.number} · {chapter.title}
        </p>
      </div>

      <div
        className="mobile-detail__body"
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        <p className="eyebrow">
          {pageIndex + 1} of {chapter.pages.length}
        </p>
        <h2 className="mobile-detail__title">{page.title}</h2>

        {page.sections.map((section) => (
          <section className="learn-detail__section" key={section.label}>
            <h3>{section.label}</h3>
            {section.body && <p>{section.body}</p>}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <footer className="mobile-detail__pager">
        <button
          className="mobile-detail__pager-btn"
          disabled={isFirst}
          onClick={goPrev}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={18} />
          Back
        </button>
        <div aria-hidden="true" className="mobile-detail__dots">
          {chapter.pages.map((_, index) => (
            <span className={index === pageIndex ? 'is-active' : ''} key={index} />
          ))}
        </div>
        {isLast ? (
          <button className="mobile-detail__pager-btn" onClick={onBack} type="button">
            Done
          </button>
        ) : (
          <button className="mobile-detail__pager-btn" onClick={goNext} type="button">
            Next
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        )}
      </footer>
    </div>
  );
}

export function MobileLearn() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = learnChapters.find((chapter) => chapter.chapterId === selectedId);

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
              <span className="learn-grid__number">{chapter.number}</span>
              <strong>{chapter.title}</strong>
              <span className="learn-grid__remember">{chapter.rememberThis}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

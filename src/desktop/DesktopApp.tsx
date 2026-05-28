import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Check,
  CircleDot,
  Compass,
  Eye,
  HeartHandshake,
  Lightbulb,
  PanelLeftClose,
  PanelLeftOpen,
  ScanEye,
  Sparkles,
  Users,
} from 'lucide-react';
import { PlacedChapterArtifact } from '../components/ChapterArtifact';
import { ChapterVisual } from '../components/ChapterVisual';
import { getChapterArtifactMap } from '../data/chapterArtifacts';
import type { MirrorLaunchContext } from '../data/mirrorPresets';
import { chapters, MIRROR_ID, OVERVIEW_ID, PRACTICE_ID, principles } from '../data/wiredForLove';
import { MirrorTab, type MirrorPhase } from '../mirror/MirrorTab';
import { DesktopPractice } from './DesktopPractice';

const progressKey = 'wired-for-love-progress-v1';
const navCollapsedKey = 'wired-for-love-nav-collapsed-v1';

function readProgress() {
  try {
    const raw = localStorage.getItem(progressKey);
    return raw ? new Set<string>(JSON.parse(raw) as string[]) : new Set<string>();
  } catch {
    return new Set<string>();
  }
}

function readNavCollapsed() {
  try {
    return localStorage.getItem(navCollapsedKey) === 'true';
  } catch {
    return false;
  }
}

export function DesktopApp() {
  const [activeId, setActiveId] = useState(OVERVIEW_ID);
  const [completed, setCompleted] = useState<Set<string>>(readProgress);
  const [navCollapsed, setNavCollapsed] = useState(readNavCollapsed);
  const [mirrorPhase, setMirrorPhase] = useState<MirrorPhase>('intent');
  const [mirrorLaunchContext, setMirrorLaunchContext] = useState<MirrorLaunchContext | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  const isOverview = activeId === OVERVIEW_ID;
  const isPractice = activeId === PRACTICE_ID;
  const isMirror = activeId === MIRROR_ID;
  const isLearnChapter = !isOverview && !isPractice && !isMirror;
  const mirrorLiveFullscreen = isMirror && mirrorPhase === 'live';

  const activeChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === activeId) ?? chapters[0],
    [activeId],
  );

  const artifactMap = useMemo(
    () =>
      isLearnChapter
        ? getChapterArtifactMap(activeChapter.id, activeChapter.visual.type)
        : {},
    [activeChapter.id, activeChapter.visual.type, isLearnChapter],
  );

  const hasHeroArtifact = Boolean(artifactMap.hero);
  const hasVisualArtifact = Boolean(artifactMap.visual);

  const progressPercent = Math.round((completed.size / chapters.length) * 100);

  useEffect(() => {
    localStorage.setItem(progressKey, JSON.stringify(Array.from(completed)));
  }, [completed]);

  useEffect(() => {
    if (isOverview || isPractice || isMirror) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    mainRef.current?.focus({ preventScroll: true });
  }, [activeId, isOverview, isPractice, isMirror]);

  const selectChapter = (chapterId: string) => {
    setMirrorLaunchContext(null);
    setActiveId(chapterId);
  };

  const selectOverview = () => {
    setActiveId(OVERVIEW_ID);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectPractice = () => {
    setMirrorLaunchContext(null);
    setActiveId(PRACTICE_ID);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectMirror = () => {
    setMirrorLaunchContext(null);
    setMirrorPhase('intent');
    setActiveId(MIRROR_ID);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startMirrorFromPractice = (chapterId: string) => {
    const chapter = chapters.find((item) => item.id === chapterId);
    if (!chapter) return;

    setMirrorLaunchContext({
      chapterId: chapter.id,
      chapterNumber: chapter.number,
      chapterTitle: chapter.title,
      activityTitle: chapter.practice.title,
    });
    setMirrorPhase('intent');
    setActiveId(MIRROR_ID);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openChapter = (chapterId: string) => {
    setMirrorLaunchContext(null);
    setActiveId(chapterId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleNav = () => {
    setNavCollapsed((current) => {
      const next = !current;
      localStorage.setItem(navCollapsedKey, String(next));
      return next;
    });
  };

  const toggleCompleteFor = (chapterId: string) => {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const toggleComplete = () => {
    toggleCompleteFor(activeChapter.id);
  };

  const shellModeClass = isOverview || isPractice || isMirror ? 'is-overview' : '';

  return (
    <div
      className={`app-shell ${navCollapsed ? 'nav-collapsed' : ''} ${shellModeClass} ${mirrorLiveFullscreen ? 'app-shell--mirror-live' : ''}`}
    >
      <aside
        aria-label="Wired for Love chapters"
        className={`chapter-rail ${navCollapsed ? 'is-collapsed' : ''}`}
      >
        <div className="rail-header">
          <button
            aria-current={isOverview ? 'page' : undefined}
            className={`brand-lockup ${isOverview ? 'is-active' : ''}`}
            onClick={selectOverview}
            title="Wired for Love: Overview"
            type="button"
          >
            <span aria-hidden="true" className="brand-mark">
              <HeartHandshake size={22} />
            </span>
            {!navCollapsed && (
              <div className="brand-lockup__text">
                <p className="eyebrow">Shared Reading</p>
                <h1>Wired for Love</h1>
              </div>
            )}
          </button>

          <button
            aria-expanded={!navCollapsed}
            aria-label={navCollapsed ? 'Expand chapter navigation' : 'Collapse chapter navigation'}
            className="rail-toggle"
            onClick={toggleNav}
            type="button"
          >
            {navCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {!navCollapsed && (
          <div className="progress-card">
            <div className="progress-card__top">
              <span>{progressPercent}% complete</span>
              <span>
                {completed.size}/{chapters.length}
              </span>
            </div>
            <div className="progress-track">
              <span style={{ width: `${progressPercent}%` }} />
            </div>
            <p>Read a chapter together, try one exercise, mark it when the idea feels shared.</p>
          </div>
        )}

        {navCollapsed && (
          <div aria-hidden="true" className="rail-progress-mini">
            <span className="rail-progress-mini__value">{progressPercent}%</span>
            <div className="rail-progress-mini__track">
              <span style={{ height: `${progressPercent}%` }} />
            </div>
          </div>
        )}

        <nav aria-label="Chapters" className="chapter-list">
          {!navCollapsed && <p className="rail-section-label">Start</p>}

          <button
            aria-current={isOverview ? 'page' : undefined}
            aria-label={navCollapsed ? 'Overview: Tatkin ten chapter principles' : undefined}
            className={`chapter-link chapter-link--overview ${isOverview ? 'is-active' : ''}`}
            onClick={selectOverview}
            title={navCollapsed ? 'Overview' : undefined}
            type="button"
          >
            <span className="chapter-link__number">
              <Compass size={18} />
            </span>
            {!navCollapsed && (
              <span className="chapter-link__copy">
                <strong>Overview</strong>
                <small>Tatkin&apos;s ten chapter principles</small>
              </span>
            )}
          </button>

          {!navCollapsed && <p className="rail-section-label">Tools</p>}

          <button
            aria-current={isPractice ? 'page' : undefined}
            aria-label={navCollapsed ? 'Practice: All chapter exercises' : undefined}
            className={`chapter-link chapter-link--tool ${isPractice ? 'is-active' : ''}`}
            onClick={selectPractice}
            title={navCollapsed ? 'Practice' : undefined}
            type="button"
          >
            <span className="chapter-link__number">
              <Sparkles size={18} />
            </span>
            {!navCollapsed && (
              <span className="chapter-link__copy">
                <strong>Practice</strong>
                <small>All chapter exercises</small>
              </span>
            )}
          </button>

          <button
            aria-current={isMirror ? 'page' : undefined}
            aria-label={navCollapsed ? 'Mirror: Volume mirror for talks' : undefined}
            className={`chapter-link chapter-link--tool ${isMirror ? 'is-active' : ''}`}
            onClick={selectMirror}
            title={navCollapsed ? 'Mirror' : undefined}
            type="button"
          >
            <span className="chapter-link__number">
              <ScanEye size={18} />
            </span>
            {!navCollapsed && (
              <span className="chapter-link__copy">
                <strong>Mirror</strong>
                <small>Volume mirror for talks</small>
              </span>
            )}
          </button>

          {!navCollapsed && <p className="rail-section-label">Chapters</p>}

          {chapters.map((chapter) => {
            const isActive = isLearnChapter && chapter.id === activeChapter.id;
            const isComplete = completed.has(chapter.id);
            const label = `Chapter ${chapter.number}: ${chapter.title}`;

            return (
              <button
                aria-current={isActive ? 'page' : undefined}
                aria-label={navCollapsed ? label : undefined}
                className={`chapter-link ${isActive ? 'is-active' : ''}`}
                key={chapter.id}
                onClick={() => selectChapter(chapter.id)}
                title={navCollapsed ? label : undefined}
                type="button"
              >
                <span className="chapter-link__number">{chapter.number}</span>
                {!navCollapsed && (
                  <>
                    <span className="chapter-link__copy">
                      <strong>{chapter.title}</strong>
                      <small>{chapter.principle}</small>
                    </span>
                    <span className={`chapter-link__status ${isComplete ? 'is-done' : ''}`}>
                      {isComplete ? <Check size={14} /> : <CircleDot size={14} />}
                    </span>
                  </>
                )}
                {navCollapsed && (
                  <span className={`chapter-link__dot ${isComplete ? 'is-done' : ''}`} />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      <main
        className="chapter-stage"
        key={activeId}
        ref={mainRef}
        tabIndex={-1}
      >
        {isPractice ? (
          <DesktopPractice
            completed={completed}
            onOpenChapter={openChapter}
            onStartMirror={startMirrorFromPractice}
            onToggleComplete={toggleCompleteFor}
          />
        ) : isMirror ? (
          <div className="desktop-mirror">
            <MirrorTab launchContext={mirrorLaunchContext} onPhaseChange={setMirrorPhase} />
          </div>
        ) : isOverview ? (
          <>
            <section className="overview-hero">
              <div className="overview-hero__copy">
                <p className="eyebrow">Stan Tatkin · Wired for Love</p>
                <h2>A shared reading companion</h2>
                <p>
                  Ten book chapters, ten principles. Read the same spine as the book, use Tatkin&apos;s
                  stories and exercises, and keep language aligned so you and your partner share one source.
                </p>
              </div>
              <div className="overview-hero__meta">
                <span>{chapters.length} chapters</span>
                <span>{completed.size} marked read</span>
              </div>
            </section>

            <section aria-label="Ten principles overview" className="principles-grid">
              {principles.map((principle, index) => {
                const chapter = chapters[index];
                const isComplete = completed.has(chapter.id);

                return (
                  <button
                    className="principle-card"
                    key={chapter.id}
                    onClick={() => selectChapter(chapter.id)}
                    type="button"
                  >
                    <span className="principle-card__number">{chapter.number}</span>
                    <strong>{chapter.title}</strong>
                    <p>{principle}</p>
                    {isComplete && (
                      <span className="principle-card__done">
                        <Check size={14} />
                        Read
                      </span>
                    )}
                  </button>
                );
              })}
            </section>
          </>
        ) : (
          <>
            <section
              aria-labelledby="chapter-heading"
              className={`hero-panel${hasHeroArtifact ? ' hero-panel--with-artifact' : ''}`}
            >
              {hasHeroArtifact && (
                <PlacedChapterArtifact
                  className="hero-panel__artifact"
                  spec={artifactMap.hero}
                  variant="hero"
                />
              )}
              <div className="hero-panel__copy">
                <p className="eyebrow">Chapter {activeChapter.number}</p>
                <h2 id="chapter-heading">{activeChapter.title}</h2>
                <p className="hero-panel__subtitle">{activeChapter.subtitle}</p>
                <p className="hero-panel__principle">{activeChapter.principle}</p>
              </div>
            </section>

            <section aria-label="Tatkin frame" className="guide-section guide-section--frame">
              <div className="guide-section__header">
                <BookOpen size={20} />
                <div>
                  <p className="eyebrow">Tatkin Frame</p>
                  <h3>How the book sets this up</h3>
                </div>
              </div>
              <p className="guide-section__lead">{activeChapter.tatkinFrame}</p>
            </section>

            <section aria-label="Chapter visual model" className="visual-panel">
              <div className="visual-panel__intro">
                <p className="eyebrow">Visual Model</p>
                <p>{activeChapter.visual.caption}</p>
              </div>
              <div
                className={`visual-panel__body visual-model-layout${hasVisualArtifact ? ' visual-model-layout--with-artifact' : ''}`}
              >
                {hasVisualArtifact && (
                  <div className="artifact-slot artifact-slot--visual">
                    <PlacedChapterArtifact spec={artifactMap.visual} variant="visual" />
                  </div>
                )}
                <div className="visual-model-layout__content">
                  <ChapterVisual type={activeChapter.visual.type} />
                </div>
              </div>
            </section>

            <section aria-label="Book story" className="guide-section guide-section--story">
              <div className="guide-section__header">
                <Compass size={20} />
                <div>
                  <p className="eyebrow">From the Book</p>
                  <h3>{activeChapter.bookStory.label}</h3>
                </div>
              </div>
              <p className="guide-section__lead">{activeChapter.bookStory.setup}</p>
              <p className="guide-section__point">{activeChapter.bookStory.tatkinPoint}</p>
            </section>

            <section aria-label="What it teaches" className="guide-section">
              <div className="guide-section__header">
                <Lightbulb size={20} />
                <div>
                  <p className="eyebrow">What It Teaches</p>
                  <h3>Core ideas to carry forward</h3>
                </div>
              </div>
              <ul className="guide-list">
                {activeChapter.whatItTeaches.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-label="Recognize it" className="guide-section guide-section--recognize">
              <div className="guide-section__header">
                <Eye size={20} />
                <div>
                  <p className="eyebrow">Recognize It</p>
                  <h3>When this chapter is live</h3>
                </div>
              </div>
              <ul className="guide-list">
                {activeChapter.recognizeIt.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-label="Partner move" className="guide-section guide-section--partner">
              <div className="guide-section__header">
                <Users size={20} />
                <div>
                  <p className="eyebrow">Partner Move</p>
                  <h3>What to do together</h3>
                </div>
              </div>
              <p className="guide-section__lead">{activeChapter.partnerMove}</p>
            </section>

            <section aria-label="Practice" className="guide-section guide-section--practice">
              <div className="guide-section__header">
                <Sparkles size={20} />
                <div>
                  <p className="eyebrow">Practice</p>
                  <h3>{activeChapter.practice.title}</h3>
                </div>
              </div>
              <p className="guide-section__when">{activeChapter.practice.whenToUse}</p>
              <ol className="practice-steps">
                {activeChapter.practice.steps.map((step, index) => (
                  <li key={step}>
                    <span className="practice-steps__number">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <button className="complete-button" onClick={toggleComplete} type="button">
                {completed.has(activeChapter.id) ? 'Marked as read' : 'Mark chapter read'}
              </button>
            </section>

            <section aria-label="Remember this" className="remember-panel">
              <div className="remember-header">
                <Lightbulb aria-hidden="true" size={18} />
                <p className="eyebrow">Remember This</p>
              </div>
              <p className="remember-cue">{activeChapter.rememberThis}</p>
            </section>
          </>
        )}
      </main>

      {isLearnChapter && (
        <aside aria-label="Chapter reference" className="right-lab">
          <section className="lab-card lab-card--glossary">
            <div className="lab-card__header">
              <p className="eyebrow">Chapter Glossary</p>
            </div>
            <div className="glossary-list">
              {activeChapter.glossaryTerms.map((item) => (
                <details key={item.term}>
                  <summary>{item.term}</summary>
                  <p>{item.definition}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="lab-card lab-card--source">
            <p className="eyebrow">Source</p>
            <p className="source-status">{activeChapter.sourceStatus}</p>
            <ul className="source-refs">
              {activeChapter.sourceRefs.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ul>
          </section>
        </aside>
      )}
    </div>
  );
}


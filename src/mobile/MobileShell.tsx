import { useState } from 'react';
import { BookOpen, ScanEye, Sparkles } from 'lucide-react';
import { MirrorTab, type MirrorPhase } from '../mirror/MirrorTab';
import { MobileLearn } from './MobileLearn';
import { MobilePractice } from './MobilePractice';

export type MobileTab = 'learn' | 'practice' | 'mirror';

const tabs: { id: MobileTab; label: string; icon: typeof BookOpen }[] = [
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Sparkles },
  { id: 'mirror', label: 'Mirror', icon: ScanEye },
];

export function MobileShell() {
  const [activeTab, setActiveTab] = useState<MobileTab>('learn');
  const [mirrorPhase, setMirrorPhase] = useState<MirrorPhase>('intent');
  const mirrorLiveFullscreen = activeTab === 'mirror' && mirrorPhase === 'live';

  return (
    <div className={`mobile-shell ${mirrorLiveFullscreen ? 'mobile-shell--mirror-live' : ''}`}>
      <header className="mobile-topbar">
        <p className="eyebrow">Wired for Love</p>
        <h1>Companion</h1>
      </header>

      <main className="mobile-main">
        {activeTab === 'learn' && <MobileLearn />}
        {activeTab === 'practice' && <MobilePractice />}
        {activeTab === 'mirror' && <MirrorTab onPhaseChange={setMirrorPhase} />}
      </main>

      <nav aria-label="Mobile sections" className="mobile-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              aria-current={isActive ? 'page' : undefined}
              className={`mobile-nav__item ${isActive ? 'is-active' : ''}`}
              key={tab.id}
              onClick={() => {
                if (tab.id !== 'mirror') setMirrorPhase('intent');
                setActiveTab(tab.id);
              }}
              type="button"
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

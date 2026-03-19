import { useEffect, useState } from 'react';
import { profile } from '../data/portfolio';

const navItems = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['certificates', 'Certificates'],
  ['projects', 'Projects'],
  ['contact', 'Contact']
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.min((window.scrollY / maxScroll) * 100, 100);
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    const headerOffset = 76;

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(elementPosition - headerOffset, 0);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setIsOpen(false);
  };

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-white relative">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-5 md:px-8 md:py-2">
        <button type="button" className="flex items-center gap-2 text-left" onClick={() => handleScroll('home')}>
          <span className="nav-brand-letter" aria-hidden="true">
            G
          </span>
          <span>
            <span className="block text-base font-semibold text-[var(--color-ink)]">{profile.name}</span>
          <span className="block text-[11px] text-[var(--color-muted)]">{profile.title}</span>
          </span>
        </button>

        <div className="hidden items-center gap-1.5 rounded-full border border-[rgba(37,99,235,0.18)] bg-[var(--color-softest)] px-2 py-1.5 shadow-[0_8px_18px_rgba(15,23,42,0.04)] md:inline-flex">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="nav-glow rounded-full border border-[rgba(37,99,235,0.22)] bg-white px-2.5 py-1 text-[13px] font-medium text-[var(--color-body)]"
              onClick={() => handleScroll(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-softest)] text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-[var(--color-line)] bg-white/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-5">
            <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-soft)] p-3 shadow-[0_18px_40px_rgba(17,24,39,0.08)]">
              <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Navigation
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className="nav-glow rounded-xl border border-transparent bg-white px-4 py-3 text-left text-sm font-medium text-[var(--color-body)] transition hover:border-[var(--color-accent)]"
                    onClick={() => handleScroll(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="nav-progress" aria-hidden="true">
        <span className="nav-progress__bar" style={{ width: `${scrollProgress}%` }} />
      </div>
    </header>
  );
}

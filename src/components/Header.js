import { useState } from 'react';
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <button type="button" className="text-left" onClick={() => handleScroll('home')}>
          <span className="block text-lg font-semibold text-[var(--color-ink)]">{profile.name}</span>
          <span className="block text-xs text-[var(--color-muted)]">{profile.title}</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="nav-glow text-sm text-[var(--color-body)]"
              onClick={() => handleScroll(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="text-[var(--color-ink)] md:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="mx-auto max-w-6xl border-t border-[var(--color-line)] px-5 py-4 md:hidden md:px-8">
          <div className="flex flex-col gap-3">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                type="button"
                className="nav-glow text-left text-sm text-[var(--color-body)]"
                onClick={() => handleScroll(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

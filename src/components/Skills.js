import { skillGroups } from '../data/portfolio';

const skillIcons = {
  React: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 4h16v16H4z" rx="3" />
      <path d="M10.2 15.9c.3.5.8.8 1.4.8.7 0 1.2-.3 1.2-.8 0-.6-.4-.8-1.3-1.2l-.5-.2c-1.3-.5-2.1-1.2-2.1-2.5 0-1.3 1-2.4 2.7-2.4 1.2 0 2 .4 2.6 1.5l-1.4.9c-.3-.5-.6-.7-1.1-.7-.5 0-.9.3-.9.7 0 .5.3.7 1.1 1l.5.2c1.5.6 2.3 1.2 2.3 2.6 0 1.5-1.2 2.4-2.9 2.4-1.7 0-2.8-.8-3.3-1.9zm7.3-.2c.3.5.7.8 1.1.8.5 0 .8-.2.8-1V9.7h1.9v5.9c0 1.8-1.1 2.6-2.6 2.6-1.4 0-2.2-.7-2.6-1.5z" fill="#fff" />
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 3h16l-1.5 17L12 22l-6.5-2L4 3zm12.2 4H7.8l.2 2.2h8l-.5 6.1-3.5 1-3.4-1-.2-2.2h2l.1.8 1.5.4 1.6-.4.2-2.4H7.7L7.1 5h9.3z" />
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 3h16l-1.5 17L12 22l-6.5-2L4 3zm11.6 4H8l.2 2.2h7.2l-.5 6.1-3 1-2.9-1-.1-1.6h2l.1.5 1 .3 1.1-.3.2-2.4H8.4L7.9 5h7.9z" />
    </svg>
  ),
  'Responsive Design': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="12" height="10" rx="1.5" />
      <path d="M7 19h4" />
      <rect x="17" y="8" width="4" height="8" rx="1" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 5h5a3 3 0 0 1 3 3v2H9a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h5" />
      <path d="M16 19h-5a3 3 0 0 1-3-3v-2h7a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3h-5" />
      <circle cx="10" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 14c0 1.7 4 1.7 4 0" />
      <path d="M8 10h8a4 4 0 0 1-8 0z" />
      <path d="M12 4c2 1.4-2 2.2 0 3.8" />
      <path d="M14 3c2 1.4-2 2.2 0 3.8" />
    </svg>
  ),
  'C Programming': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.5 7.5A5.5 5.5 0 1 0 15.5 16.5" />
      <path d="M18 9v6" />
      <path d="M21 12h-6" />
    </svg>
  ),
  'Problem Solving': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.5 14.5C7.6 13.7 7 12.4 7 11a5 5 0 1 1 10 0c0 1.4-.6 2.7-1.5 3.5-.6.5-1 1.1-1.2 1.8h-2.6c-.2-.7-.6-1.3-1.2-1.8z" />
    </svg>
  ),
  'UI/UX Design': (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="16" r="3" />
      <path d="M10.5 10.5l3 3" />
      <path d="M14.5 6.5l3-3" />
      <path d="M6.5 14.5l-3 3" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 0 8 4 4 0 1 0 4 4v-4a4 4 0 1 0 0-8h-4a4 4 0 0 1 4-4h4v4h-4a4 4 0 1 1 0 8h4a4 4 0 1 0 0-8V2h-4z" />
    </svg>
  ),
  Photoshop: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 15V9h2.5a2 2 0 1 1 0 4H9" />
      <path d="M15 15c.4.5.9.8 1.6.8.8 0 1.4-.3 1.4-.9 0-.6-.4-.8-1.3-1.1l-.6-.2c-1.1-.4-1.7-1-1.7-2 0-1.2 1-2 2.4-2 .9 0 1.6.3 2.1.9" />
    </svg>
  ),
  Wireframing: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 13h8" />
      <path d="M8 16h5" />
    </svg>
  )
};

export default function Skills() {
  return (
    <section id="skills" className="border-b border-[var(--color-line)] bg-white">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-0 md:px-8 md:pb-20 md:pt-2">
        <div className="mb-12 max-w-3xl">
          <p className="section-kicker">Skills</p>
          <h2 className="section-title">Technical capabilities</h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-body)]">
            A focused set of technologies and tools used across academic and personal projects.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="panel interactive-card">
              <h3 className="panel-title">{group.title}</h3>
              <div className="mt-6 grid gap-4">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="interactive-card flex items-center gap-3 rounded-lg border border-[var(--color-line)] bg-white p-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-soft)] text-[var(--color-accent)]">
                      {skillIcons[item.name]}
                    </div>
                    <span className="text-sm font-medium text-[var(--color-ink)]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { profile, stats } from '../data/portfolio';

export default function Hero() {
  return (
    <section id="home" className="hero-surface border-b border-[var(--color-line)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-0 md:px-8 md:pb-24 md:pt-2 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-28 lg:pt-4">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Professional Portfolio
          </p>
          <h1 className="hero-name max-w-4xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl text-[var(--color-muted)]">{profile.title}</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-body)]">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-md bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)] hover:text-white"
            >
              View Projects
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
            <span className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5">
              {profile.location}
            </span>
            <span className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5">
              Open to internships
            </span>
            <a
              href="#contact"
              className="rounded-full border border-[rgba(37,99,235,0.24)] bg-[rgba(37,99,235,0.05)] px-3 py-1.5 font-medium text-[var(--color-accent)]"
            >
              Resume in contact
            </a>
          </div>

        </div>

        <div className="relative">
          <div className="hero-visual">
            <div className="hero-stats">
              <div className="hero-stats__header">
                <p className="hero-stats__eyebrow">Professional Snapshot</p>
                <h2 className="hero-stats__title">Highlights at a glance</h2>
              </div>
              <ul className="hero-stats__list">
                {stats.map((stat) => (
                  <li key={stat.label} className="hero-stat-card">
                    <div className="hero-stat-card__value">{stat.value}</div>
                    <div className="hero-stat-card__content">
                      <div className="hero-stat-card__label">{stat.label}</div>
                      <p className="hero-stat-card__note">{stat.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

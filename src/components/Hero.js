import { profile, stats } from '../data/portfolio';

export default function Hero() {
  return (
    <section id="home" className="hero-surface border-b border-[var(--color-line)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-10 md:px-8 md:pb-24 md:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-28 lg:pt-16">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Professional Portfolio
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl text-[var(--color-muted)]">{profile.title}</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-body)]">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-md bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]"
            >
              View Projects
            </a>
            <a
              href="/Gowsik_R_Resume.pdf"
              download="Gowsik_R_Resume.pdf"
              className="rounded-md border border-[var(--color-line-strong)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="hero-visual">
            <div className="hero-grid-lines" />

            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat-card">
                  <div className="text-3xl font-semibold text-[var(--color-ink)]">{stat.value}</div>
                  <div className="mt-2 text-sm text-[var(--color-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

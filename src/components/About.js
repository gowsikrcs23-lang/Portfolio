import { education, experience, highlights } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="border-b border-[var(--color-line)] bg-[var(--color-softest)]">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 md:px-8 md:pb-20 md:pt-14">
        <div>
          <p className="section-kicker">About</p>
          <h2 className="section-title">Professional background and academic foundation</h2>
          <div className="interactive-card mt-8 max-w-4xl rounded-lg border border-[var(--color-line)] bg-white p-6">
            <div className="space-y-4 text-base leading-8 text-[var(--color-body)]">
              {highlights.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <div className="panel interactive-card">
            <h3 className="panel-title">Education</h3>
            <div className="mt-6 grid gap-5">
              {education.map((item) => (
                <article key={item.degree} className="interactive-card rounded-lg border border-[var(--color-line)] bg-white p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--color-ink)]">{item.degree}</h4>
                      <p className="text-sm text-[var(--color-accent)]">{item.institution}</p>
                    </div>
                    <span className="text-sm text-[var(--color-muted)]">{item.period}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-body)]">{item.note}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel interactive-card">
            <h3 className="panel-title">Internships</h3>
            <div className="mt-6 grid gap-5">
              {experience.map((item) => (
                <article key={item.role} className="interactive-card rounded-lg border border-[var(--color-line)] bg-white p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--color-ink)]">{item.role}</h4>
                      <p className="text-sm text-[var(--color-accent)]">{item.company}</p>
                    </div>
                    <span className="text-sm text-[var(--color-muted)]">{item.period}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-body)]">{item.focus}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

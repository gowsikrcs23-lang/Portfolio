import { skillGroups } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="border-b border-[var(--color-line)] bg-white">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 md:px-8 md:pb-20 md:pt-14">
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
              <div className="mt-6 grid gap-5">
                {group.items.map((item) => (
                  <div key={item.name} className="interactive-card rounded-lg border border-[var(--color-line)] bg-white p-4">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-[var(--color-ink)]">{item.name}</span>
                      <span className="text-sm text-[var(--color-muted)]">{item.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[var(--color-soft)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-accent)]"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
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

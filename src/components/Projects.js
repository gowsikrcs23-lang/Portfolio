import { projects } from '../data/portfolio';

export default function Projects() {
  return (
    <section id="projects" className="border-b border-[var(--color-line)] bg-[var(--color-softest)]">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-0 md:px-8 md:pb-20 md:pt-2">
        <div className="mb-12 max-w-3xl">
          <p className="section-kicker">Projects</p>
          <h2 className="section-title">Project works</h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-body)]">
            Projects that reflect experience in web development, UI design, and full-stack application building.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.title} className="panel interactive-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--color-accent)]">{project.type}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">{project.title}</h3>
                </div>
                <span className="text-sm text-[var(--color-muted)]">0{index + 1}</span>
              </div>

              <p className="mt-5 text-sm leading-7 text-[var(--color-body)]">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="interactive-card rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-body)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

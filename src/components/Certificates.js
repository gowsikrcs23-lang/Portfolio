import { certificates } from '../data/portfolio';

export default function Certificates() {
  return (
    <section id="certificates" className="border-b border-[var(--color-line)] bg-[var(--color-softest)]">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 md:px-8 md:pb-20 md:pt-14">
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker">Certificates</p>
          <h2 className="section-title">Certifications and learning milestones</h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-body)]">
            Selected certifications that support my development in software, design, and technical problem solving.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <article key={certificate.title} className="panel interactive-card">
              {certificate.image && (
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="mb-5 h-44 w-full rounded-lg border border-[var(--color-line)] object-cover object-top"
                />
              )}
              <p className="text-sm font-medium text-[var(--color-accent)]">{certificate.issuer}</p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--color-ink)]">{certificate.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-body)]">{certificate.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

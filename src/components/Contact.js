import { profile } from '../data/portfolio';
import Footer from './Footer';

const links = [
  {
    label: 'Email',
    href: profile.links.mail,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16v12H4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m4 7 8 6 8-6" />
      </svg>
    )
  },
  {
    label: 'GitHub',
    href: profile.links.github,
    icon: <img src="https://github.com/favicon.ico" alt="GitHub" className="h-6 w-6 object-contain" />
  },
  {
    label: 'LinkedIn',
    href: profile.links.linkedin,
    icon: <img src="https://www.linkedin.com/favicon.ico" alt="LinkedIn" className="h-6 w-6 object-contain" />
  },
  {
    label: 'LeetCode',
    href: profile.links.leetcode,
    icon: <img src="https://leetcode.com/static/images/LeetCode_logo.png" alt="LeetCode" className="h-6 w-6 object-contain" />
  }
];

export default function Contact() {
  return (
    <section id="contact" className="flex min-h-[calc(100vh-76px)] flex-col justify-between bg-white">
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 pb-12 pt-0 md:px-8 md:pt-2">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-xl">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">Contact information and resume</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-body)]">
              I am open to internships, project work, and entry-level software opportunities. You can reach me through the platforms below.
            </p>
          </div>

          <div className="panel interactive-card w-full justify-self-center lg:max-w-[24rem]">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-card flex h-14 w-14 items-center justify-center rounded-lg border border-[var(--color-line)] bg-white"
                  aria-label={link.label}
                  title={link.label}
                >
                  <div className="text-[var(--color-ink)]">{link.icon}</div>
                </a>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-4 sm:justify-start">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)] hover:text-white"
              >
                View Resume
              </a>
              <a
                href={profile.links.mail}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[var(--color-line-strong)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Send Mail
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

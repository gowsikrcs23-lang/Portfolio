import { profile } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-line)] bg-[var(--color-softest)] px-5 py-4 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <p>Professional portfolio website</p>
      </div>
    </footer>
  );
}

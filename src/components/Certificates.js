import { useEffect, useRef, useState } from 'react';
import { certificates } from '../data/portfolio';

export default function Certificates() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const scrollingCertificates = [...certificates, ...certificates];

  useEffect(() => {
    if (!activeCertificate) {
      document.body.style.overflow = '';
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveCertificate(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCertificate]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || !activeCertificate) {
      return undefined;
    }

    const handleWheel = (event) => {
      event.preventDefault();
      content.scrollBy({
        top: (event.deltaY + event.deltaX) * 1.2,
        behavior: 'smooth'
      });
    };

    content.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      content.removeEventListener('wheel', handleWheel);
    };
  }, [activeCertificate]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) {
      return undefined;
    }

    let animationFrameId;
    let lastTimestamp = 0;

    const syncProgress = () => {
      const halfWidth = marquee.scrollWidth / 2;
      if (!halfWidth) {
        return;
      }

      setProgress((marquee.scrollLeft / halfWidth) * 100);
    };

    const step = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!activeCertificate && !isInteracting) {
        marquee.scrollLeft += delta * 0.05;
        const halfWidth = marquee.scrollWidth / 2;

        if (marquee.scrollLeft >= halfWidth) {
          marquee.scrollLeft -= halfWidth;
        }

        syncProgress();
      }

      animationFrameId = window.requestAnimationFrame(step);
    };

    marquee.scrollLeft = 0;
    syncProgress();
    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [activeCertificate, isInteracting]);

  const handleSliderChange = (event) => {
    const marquee = marqueeRef.current;
    if (!marquee) {
      return;
    }

    const nextProgress = Number(event.target.value);
    const halfWidth = marquee.scrollWidth / 2;
    marquee.scrollLeft = (nextProgress / 100) * halfWidth;
    setProgress(nextProgress);
  };

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

        <div ref={marqueeRef} className="certificate-marquee" aria-label="Certificates gallery">
          <div className="certificate-marquee__track">
            {scrollingCertificates.map((certificate, index) => (
              <article
                key={`${certificate.title}-${index}`}
                className="panel interactive-card certificate-marquee__card text-left"
              >
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
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="certificate-card__action"
                    onClick={() => setActiveCertificate(certificate)}
                  >
                    View Details
                  </button>
                  <span className="certificate-card__arrow" aria-hidden="true">
                    &gt;
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="certificate-slider">
          <span className="certificate-slider__label">Move Certificates</span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            className="certificate-slider__input"
            onChange={handleSliderChange}
            onPointerDown={() => setIsInteracting(true)}
            onPointerUp={() => setIsInteracting(false)}
            onBlur={() => setIsInteracting(false)}
          />
        </div>
      </div>

      {activeCertificate && (
        <div
          className="certificate-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          onClick={() => setActiveCertificate(null)}
        >
          <div className="certificate-modal__card" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="certificate-modal__close"
              onClick={() => setActiveCertificate(null)}
              aria-label="Close certificate details"
            >
              x
            </button>

            <div className="certificate-modal__layout">
              <div className="certificate-modal__media">
                {activeCertificate.image && (
                  <img
                    src={activeCertificate.image}
                    alt={activeCertificate.title}
                    className="certificate-modal__image"
                  />
                )}
              </div>

              <div ref={contentRef} className="certificate-modal__content">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {activeCertificate.issuer}
                </p>
                <h3 id="certificate-modal-title" className="mt-3 text-3xl font-semibold text-[var(--color-ink)]">
                  {activeCertificate.title}
                </h3>
                <p className="mt-3 text-sm font-medium text-[var(--color-muted)]">{activeCertificate.period}</p>
                <div className="mt-6 grid gap-4 text-sm text-[var(--color-body)] sm:grid-cols-2">
                  <div className="rounded-lg border border-[var(--color-line)] bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Credential</p>
                    <p className="mt-2 font-medium text-[var(--color-ink)]">{activeCertificate.credential}</p>
                  </div>
                  <div className="rounded-lg border border-[var(--color-line)] bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Organization</p>
                    <p className="mt-2 font-medium text-[var(--color-ink)]">{activeCertificate.organization}</p>
                  </div>
                </div>
                <p className="mt-6 text-base leading-8 text-[var(--color-body)]">{activeCertificate.description}</p>
                <div className="mt-6 rounded-xl border border-[var(--color-line)] bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Highlights</p>
                  <ul className="mt-4 grid gap-3 text-sm leading-7 text-[var(--color-body)]">
                    {activeCertificate.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">{activeCertificate.note}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

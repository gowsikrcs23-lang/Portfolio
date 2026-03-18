import { useEffect, useRef, useState } from 'react';
import { certificates } from '../data/portfolio';

export default function Certificates() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [modalScroll, setModalScroll] = useState({
    handleHeight: 72,
    handleTop: 0
  });
  const contentRef = useRef(null);

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

    const updateModalScroll = () => {
      const visibleHeight = content.clientHeight;
      const totalHeight = content.scrollHeight;
      const trackHeight = Math.max(visibleHeight - 24, 72);
      const handleHeight = Math.max((visibleHeight / totalHeight) * trackHeight, 72);
      const maxHandleTop = Math.max(trackHeight - handleHeight, 0);
      const maxScrollTop = Math.max(totalHeight - visibleHeight, 1);
      const handleTop = (content.scrollTop / maxScrollTop) * maxHandleTop;

      setModalScroll({
        handleHeight,
        handleTop
      });
    };

    const handleWheel = (event) => {
      event.preventDefault();
      content.scrollBy({
        top: (event.deltaY + event.deltaX) * 2.4,
        behavior: 'auto'
      });
    };

    const handleScroll = () => {
      updateModalScroll();
    };

    content.addEventListener('wheel', handleWheel, { passive: false });
    content.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateModalScroll);
    content.scrollTop = 0;
    updateModalScroll();

    return () => {
      content.removeEventListener('wheel', handleWheel);
      content.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateModalScroll);
    };
  }, [activeCertificate]);

  useEffect(() => {
    return undefined;
  }, []);

  return (
    <section id="certificates" className="border-b border-[var(--color-line)] bg-[var(--color-softest)]">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-0 md:px-8 md:pb-20 md:pt-2">
        <div className="mb-6 max-w-3xl">
          <p className="section-kicker">Certificates</p>
          <h2 className="section-title">Certifications and learning milestones</h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-body)]">
            Selected certifications that support my development in software, design, and technical problem solving.
          </p>
        </div>

        <div className="certificate-grid" aria-label="Certificates gallery">
          {certificates.map((certificate, index) => (
            <article
              key={`${certificate.title}-${index}`}
              className="panel interactive-card certificate-grid__card text-left"
              aria-label={`Certificate ${index + 1} of ${certificates.length}`}
            >
              {certificate.image && (
                <div className="certificate-card__image-frame mb-4">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className={`certificate-card__image${
                      certificate.title === 'Hackspark-codethon' ? ' certificate-card__image--hackspark' : ''
                    }`}
                  />
                </div>
              )}
              <p className="text-sm font-medium text-[var(--color-accent)]">{certificate.issuer}</p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--color-ink)]">{certificate.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-body)]">{certificate.note}</p>
              <div className="certificate-card__footer mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  className="certificate-card__action"
                  onClick={() => setActiveCertificate(certificate)}
                >
                  View Details
                </button>
              </div>
              <div className="certificate-card__index" aria-hidden="true">
                {index + 1} / {certificates.length}
              </div>
            </article>
          ))}
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

              <div className="certificate-modal__content-shell">
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
                <div className="certificate-modal__scroll-line" aria-hidden="true">
                  <div
                    className="certificate-modal__scroll-handle"
                    style={{
                      height: `${modalScroll.handleHeight}px`,
                      transform: `translateY(${modalScroll.handleTop}px)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

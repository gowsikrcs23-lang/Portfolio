import { useEffect, useRef, useState } from 'react';
import { certificates } from '../data/portfolio';

export default function Certificates() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [marqueeProgress, setMarqueeProgress] = useState(0);
  const [modalScroll, setModalScroll] = useState({
    handleHeight: 72,
    handleTop: 0
  });
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const controlTrackRef = useRef(null);
  const pointerStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0
  });
  const controlPointerRef = useRef({
    isDragging: false
  });
  const mobileDirectionRef = useRef(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const syncViewport = (event) => {
      setIsMobileView(event.matches);
    };

    setIsMobileView(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncViewport);

      return () => {
        mediaQuery.removeEventListener('change', syncViewport);
      };
    }

    mediaQuery.addListener(syncViewport);

    return () => {
      mediaQuery.removeListener(syncViewport);
    };
  }, []);

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
        top: (event.deltaY + event.deltaX) * 1.2,
        behavior: 'smooth'
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
    const marquee = marqueeRef.current;
    if (!marquee) {
      return undefined;
    }

    let animationFrameId;
    let lastTimestamp = 0;

    const updateActiveIndex = () => {
      const cards = marquee.querySelectorAll('.certificate-marquee__card');
      if (!cards.length) {
        return;
      }

      const cardWidth = cards[0].offsetWidth;
      const cardGap = 24;
      const cardSpan = cardWidth + cardGap;
      const nextIndex = Math.round(marquee.scrollLeft / cardSpan);
      const maxIndex = certificates.length - 1;

      setActiveIndex(Math.max(0, Math.min(nextIndex, maxIndex)));
    };

    const updateProgress = () => {
      const maxScrollLeft = Math.max(marquee.scrollWidth - marquee.clientWidth, 1);
      setMarqueeProgress((marquee.scrollLeft / maxScrollLeft) * 100);
    };

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      marquee.scrollBy({
        left: event.deltaY,
        behavior: 'smooth'
      });
    };

    const step = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!activeCertificate && !isInteracting) {
        const maxScrollLeft = marquee.scrollWidth - marquee.clientWidth;
        if (maxScrollLeft > 0) {
          if (isMobileView) {
            marquee.scrollLeft += mobileDirectionRef.current * delta * 0.02;

            if (marquee.scrollLeft >= maxScrollLeft) {
              marquee.scrollLeft = maxScrollLeft;
              mobileDirectionRef.current = -1;
            } else if (marquee.scrollLeft <= 0) {
              marquee.scrollLeft = 0;
              mobileDirectionRef.current = 1;
            }
          } else {
            marquee.scrollLeft += delta * 0.015;

            if (marquee.scrollLeft >= maxScrollLeft) {
              marquee.scrollLeft = 0;
            }
          }

          updateActiveIndex();
        }
      }

      animationFrameId = window.requestAnimationFrame(step);
    };

    const handleScroll = () => {
      updateActiveIndex();
      updateProgress();
    };

    marquee.addEventListener('wheel', handleWheel, { passive: false });
    marquee.addEventListener('scroll', handleScroll);
    animationFrameId = window.requestAnimationFrame(step);
    updateActiveIndex();
    updateProgress();

    return () => {
      marquee.removeEventListener('wheel', handleWheel);
      marquee.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [activeCertificate, isInteracting, isMobileView]);

  const beginDrag = (event) => {
    const marquee = marqueeRef.current;
    if (!marquee) {
      return;
    }

    pointerStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: marquee.scrollLeft
    };

    setIsInteracting(true);
    marquee.setPointerCapture(event.pointerId);
  };

  const onDrag = (event) => {
    const marquee = marqueeRef.current;
    const pointerState = pointerStateRef.current;

    if (!marquee || !pointerState.isDragging) {
      return;
    }

    const deltaX = event.clientX - pointerState.startX;
    marquee.scrollLeft = pointerState.startScrollLeft - deltaX;
  };

  const endDrag = (event) => {
    const marquee = marqueeRef.current;
    if (!marquee) {
      return;
    }

    pointerStateRef.current.isDragging = false;
    setIsInteracting(false);

    if (marquee.hasPointerCapture(event.pointerId)) {
      marquee.releasePointerCapture(event.pointerId);
    }
  };

  const scrollToCard = (index) => {
    const marquee = marqueeRef.current;
    if (!marquee) {
      return;
    }

    const cards = marquee.querySelectorAll('.certificate-marquee__card');
    const nextCard = cards[index];

    if (!nextCard) {
      return;
    }

    setActiveIndex(index);
    setIsInteracting(true);
    marquee.scrollTo({
      left: nextCard.offsetLeft,
      behavior: 'smooth'
    });

    window.setTimeout(() => {
      setIsInteracting(false);
    }, 400);
  };

  const scrollToAdjacentCard = (direction) => {
    const nextIndex = direction === 'next'
      ? Math.min(activeIndex + 1, certificates.length - 1)
      : Math.max(activeIndex - 1, 0);

    scrollToCard(nextIndex);
  };

  const setScrollFromClientX = (clientX) => {
    const marquee = marqueeRef.current;
    const track = controlTrackRef.current;
    if (!marquee || !track) {
      return;
    }

    const rect = track.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const maxScrollLeft = Math.max(marquee.scrollWidth - marquee.clientWidth, 0);

    marquee.scrollTo({
      left: ratio * maxScrollLeft,
      behavior: 'auto'
    });
  };

  const beginControlDrag = (event) => {
    controlPointerRef.current.isDragging = true;
    setIsInteracting(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    setScrollFromClientX(event.clientX);
  };

  const onControlDrag = (event) => {
    if (!controlPointerRef.current.isDragging) {
      return;
    }

    setScrollFromClientX(event.clientX);
  };

  const endControlDrag = (event) => {
    controlPointerRef.current.isDragging = false;
    setIsInteracting(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
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

        <div
          ref={marqueeRef}
          className={`certificate-marquee${isInteracting ? ' is-dragging' : ''}`}
          aria-label="Certificates gallery"
          onPointerDown={beginDrag}
          onPointerMove={onDrag}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          <div className="certificate-marquee__track">
            {certificates.map((certificate, index) => (
              <article
                key={certificate.title}
                className="panel interactive-card certificate-marquee__card text-left"
                aria-label={`Certificate ${index + 1} of ${certificates.length}`}
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

        <div className="certificate-glide">
          <button
            type="button"
            className="certificate-glide__edge"
            aria-label="Previous certificate"
            onClick={() => scrollToAdjacentCard('prev')}
          >
            Prev
          </button>
          <div
            ref={controlTrackRef}
            className="certificate-glide__track"
            aria-label="Certificate horizontal scroll control"
            onPointerDown={beginControlDrag}
            onPointerMove={onControlDrag}
            onPointerUp={endControlDrag}
            onPointerLeave={endControlDrag}
          >
            <div className="certificate-glide__fill" style={{ width: `${marqueeProgress}%` }} />
            <div className="certificate-glide__thumb" style={{ left: `${marqueeProgress}%` }} />
            <span className="certificate-glide__hint">drag to browse</span>
          </div>
          <button
            type="button"
            className="certificate-glide__edge"
            aria-label="Next certificate"
            onClick={() => scrollToAdjacentCard('next')}
          >
            Next
          </button>
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

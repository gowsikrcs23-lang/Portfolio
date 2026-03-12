import { useEffect, useRef, useState } from 'react';

const MIN_HANDLE_HEIGHT = 72;

export default function MouseLine() {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const [metrics, setMetrics] = useState({
    handleHeight: MIN_HANDLE_HEIGHT,
    handleTop: 0
  });

  useEffect(() => {
    const updateMetrics = () => {
      const doc = document.documentElement;
      const viewportHeight = window.innerHeight;
      const scrollHeight = doc.scrollHeight;
      const maxScroll = Math.max(scrollHeight - viewportHeight, 1);
      const trackHeight = Math.max(viewportHeight - 48, MIN_HANDLE_HEIGHT);
      const handleHeight = Math.max((viewportHeight / scrollHeight) * trackHeight, MIN_HANDLE_HEIGHT);
      const maxHandleTop = Math.max(trackHeight - handleHeight, 0);
      const handleTop = (window.scrollY / maxScroll) * maxHandleTop;

      setMetrics({
        handleHeight,
        handleTop
      });
    };

    const scrollToClientY = (clientY) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height;
      const maxHandleTop = Math.max(trackHeight - metrics.handleHeight, 0);
      const relativeY = clientY - rect.top - dragOffsetRef.current;
      const clampedTop = Math.min(Math.max(relativeY, 0), maxHandleTop);
      const scrollRatio = maxHandleTop > 0 ? clampedTop / maxHandleTop : 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      window.scrollTo({
        top: scrollRatio * Math.max(maxScroll, 0),
        behavior: 'auto'
      });
    };

    const onPointerMove = (event) => {
      if (!draggingRef.current) return;
      scrollToClientY(event.clientY);
    };

    const stopDragging = () => {
      draggingRef.current = false;
      document.body.style.userSelect = '';
    };

    updateMetrics();
    window.addEventListener('scroll', updateMetrics);
    window.addEventListener('resize', updateMetrics);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', stopDragging);

    return () => {
      window.removeEventListener('scroll', updateMetrics);
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', stopDragging);
    };
  }, [metrics.handleHeight]);

  const beginDrag = (event) => {
    const track = trackRef.current;
    if (!track) return;

    const handleRect = event.currentTarget.getBoundingClientRect();
    draggingRef.current = true;
    dragOffsetRef.current = event.clientY - handleRect.top;
    document.body.style.userSelect = 'none';
  };

  const jumpToPosition = (event) => {
    if (event.target !== trackRef.current) return;

    dragOffsetRef.current = metrics.handleHeight / 2;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = event.clientY - rect.top - dragOffsetRef.current;
    const maxHandleTop = Math.max(rect.height - metrics.handleHeight, 0);
    const clampedTop = Math.min(Math.max(relativeY, 0), maxHandleTop);
    const ratio = maxHandleTop > 0 ? clampedTop / maxHandleTop : 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: ratio * Math.max(maxScroll, 0),
      behavior: 'smooth'
    });
  };

  return (
    <div ref={trackRef} className="mouse-line-track" onPointerDown={jumpToPosition} aria-hidden="true">
      <div
        className="mouse-line-handle"
        onPointerDown={beginDrag}
        style={{
          height: `${metrics.handleHeight}px`,
          transform: `translateY(${metrics.handleTop}px)`
        }}
      />
    </div>
  );
}

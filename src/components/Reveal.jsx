import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', lg = false, delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${lg ? 'reveal--lg' : ''} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Wraps words of a string in animated spans (Framer-style staggered heading). */
export function Words({ text, baseDelay = 0, step = 70 }) {
  return text.split(' ').map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="reveal-word"
      style={{ transitionDelay: `${baseDelay + i * step}ms` }}
    >
      {word}
    </span>
  ));
}

import Reveal, { Words } from './Reveal';

/** Page section wrapper (bg #f2f2f2, no vertical padding — spacing comes from .page gap). */
export function Section({ children, className = '', id }) {
  return (
    <section className={`section ${className}`.trim()} id={id}>
      {children}
    </section>
  );
}

/** Centered content column: max-width 1480, gutter 32, vertical gap 80. */
export function Content({ children, className = '', id }) {
  return (
    <div className={`content ${className}`.trim()} id={id}>
      {children}
    </div>
  );
}

/** Animated tag + heading pair (stacked, gap 16). */
export function TitleTag({ tag, title, className = '' }) {
  return (
    <Reveal className={`title-tag ${className}`.trim()}>
      <span className="tag">{tag}</span>
      <h2>
        <Words text={title} />
      </h2>
    </Reveal>
  );
}

/** Bottom-aligned split row used above section content. */
export function SectionTop({ children, className = '' }) {
  return (
    <div className={`section-top ${className}`.trim()}>
      {children}
    </div>
  );
}

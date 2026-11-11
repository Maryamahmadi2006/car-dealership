import Reveal from './Reveal';

export default function AuthLayout({
  tag,
  title,
  text,
  image,
  imageAlt,
  headline,
  blurb,
  children,
  footer,
}) {
  return (
    <section className="section auth">
      <div className="auth__inner">
        <Reveal className="auth__media" lg>
          <img src={image} alt={imageAlt} />
          <span className="auth__shade" aria-hidden="true" />
          <div className="auth__media-copy">
            <span className="tag">CAR DEALERSHIP</span>
            <h2>{headline}</h2>
            <p>{blurb}</p>
          </div>
        </Reveal>

        <Reveal className="auth__panel" delay={120}>
          <div className="auth__head">
            <span className="tag">{tag}</span>
            <h1>{title}</h1>
            <p>{text}</p>
          </div>
          {children}
          {footer && <div className="auth__foot">{footer}</div>}
        </Reveal>
      </div>
    </section>
  );
}

import Reveal, { Words } from './Reveal';
import Button from './Button';
import { Content, Section } from './Section';
import { ctaSection as defaultCta } from '../data/site';

/** Darkened image CTA card — shared by Home, Inventory and Vehicle Detail. */
export default function CtaSection({ data = defaultCta, id }) {
  return (
    <Section id={id} className="section--cta">
      <Content>
        <Reveal className="cta-card" lg>
          <img className="cta-card__bg" src={data.image} alt="" loading="lazy" />
          <div className="cta-card__shade" aria-hidden="true" />
          <div className="cta-card__body">
            <h2>
              <Words text={data.title} />
            </h2>
            <p>{data.text}</p>
            <Button to={data.cta.to} variant="light">{data.cta.label}</Button>
          </div>
        </Reveal>
      </Content>
    </Section>
  );
}

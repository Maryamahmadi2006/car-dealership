import Reveal, { Words } from './Reveal';
import Button from './Button';
import { Content, Section, TitleTag } from './Section';
import { brandLogos, servicesSection } from '../data/site';

function ServiceBlock({ block }) {
  if (block.brands) {
    return (
      <div className="svc-block svc-block--brands">
        <div className="svc-block__logos" aria-hidden="true">
          {brandLogos.map((logo) => (
            <img key={logo} src={logo} alt="" loading="lazy" />
          ))}
        </div>
        <span className="svc-block__title">{block.title}</span>
      </div>
    );
  }

  return (
    <div className="svc-block">
      <img src={block.image} alt="" loading="lazy" />
      <div className="svc-block__shade" aria-hidden="true" />
      <span className="svc-block__title">{block.title}</span>
    </div>
  );
}

/** Bento services block — used on Home and About. */
export default function ServicesSection({ data = servicesSection }) {
  return (
    <Section>
      <Content>
        <div className="services">
          <div className="services__left">
            <TitleTag tag={data.tag} title={data.title} />
            <Reveal className="services__intro" delay={120}>
              <p>{data.text}</p>
              <Button to={data.cta.to} variant="dark">{data.cta.label}</Button>
            </Reveal>
          </div>

          <div className="services__blocks">
            <div className="services__col">
              {data.leftBlocks.map((b) => (
                <Reveal key={b.title} className="services__cell">
                  <ServiceBlock block={b} />
                </Reveal>
              ))}
            </div>
            <div className="services__col">
              {data.rightBlocks.map((b) => (
                <Reveal key={b.title} className="services__cell" delay={80}>
                  <ServiceBlock block={b} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Content>
    </Section>
  );
}

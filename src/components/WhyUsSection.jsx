import Reveal, { Words } from './Reveal';
import Button from './Button';
import { Content, Section, SectionTop, TitleTag } from './Section';
import { IconCheck, IconOwners, IconShield, IconPhone } from './Icons';

const ICONS = { check: IconCheck, owners: IconOwners, shield: IconShield };

/**
 * Why-us section: heading + intro on top, wide image with overlaid
 * actions, and a row of feature pills underneath.
 */
export default function WhyUsSection({ data, tel = '+14255550142' }) {
  return (
    <Section>
      <Content>
        <SectionTop>
          <TitleTag tag={data.tag} title={data.title} />
          <Reveal className="section-top__aside" delay={100}>
            <p>{data.text}</p>
          </Reveal>
        </SectionTop>

        <Reveal className="whyus" lg>
          <div className="whyus__media">
            <img src={data.image} alt={data.imageAlt} loading="lazy" />
            <div className="whyus__shade" aria-hidden="true" />
            <div className="whyus__actions">
              <Button to={data.cta.to} variant="dark">{data.cta.label}</Button>
              <a className="icon-btn icon-btn--light" href={`tel:${tel}`} aria-label="Call us">
                <IconPhone />
              </a>
            </div>
          </div>

          <div className="whyus__features">
            {data.features.map((f) => {
              const Icon = ICONS[f.icon] || IconCheck;
              return (
                <div className="feature-pill" key={f.label}>
                  <span className="feature-pill__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="feature-pill__label">{f.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Content>
    </Section>
  );
}

import Reveal, { Words } from './Reveal';
import { Content, Section } from './Section';
import Accordion from './Accordion';

/** FAQ section: tag + heading + intro on the left, accordion on the right. */
export default function FaqSection({ data, id }) {
  return (
    <Section id={id}>
      <Content className="faq">
        <Reveal className="faq__head">
          <span className="tag">{data.tag}</span>
          <h2>
            <Words text={data.title} />
          </h2>
          <p>{data.text}</p>
        </Reveal>
        <Reveal className="faq__list" delay={120}>
          <Accordion items={data.items} />
        </Reveal>
      </Content>
    </Section>
  );
}

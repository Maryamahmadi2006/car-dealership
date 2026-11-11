import Reveal, { Words } from './Reveal';
import { Content, Section, TitleTag } from './Section';

/** "How it works" — tag + heading and three numbered step cards. */
export default function StepsSection({ data }) {
  return (
    <Section>
      <Content>
        <TitleTag tag={data.tag} title={data.title} />
        <div className="steps">
          {data.steps.map((step, i) => (
            <Reveal className="step" key={step.title} delay={i * 100}>
              <div className="step__top">
                <span className="step__badge">{i + 1}</span>
                <span className="step__title">{step.title}</span>
              </div>
              <p className="step__text">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </Content>
    </Section>
  );
}

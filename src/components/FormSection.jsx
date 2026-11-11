import Reveal, { Words } from './Reveal';
import { Content, Section } from './Section';
import LeadForm from './LeadForm';

/**
 * Rounded image-backed form section (Trade-In / Financing):
 * intro copy on the left, white form card on the right.
 */
export default function FormSection({ data, id }) {
  return (
    <Section id={id} className="section--form">
      <Content>
        <Reveal className="form-shell" lg>
          <img className="form-shell__bg" src={data.bg} alt="" loading="lazy" />
          <div className="form-shell__shade" aria-hidden="true" />
          <div className="form-shell__inner">
            <div className="form-shell__intro">
              <h2>
                <Words text={data.title} />
              </h2>
              <p>{data.text}</p>
            </div>
            <div className="form-shell__panel">
              <LeadForm fields={data.fields} submit={data.submit} />
            </div>
          </div>
        </Reveal>
      </Content>
    </Section>
  );
}

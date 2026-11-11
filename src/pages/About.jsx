import Reveal, { Words } from '../components/Reveal';
import Button from '../components/Button';
import PageHero from '../components/PageHero';
import ServicesSection from '../components/ServicesSection';
import FaqSection from '../components/FaqSection';
import { Content, Section, TitleTag } from '../components/Section';
import {
  aboutHero,
  missionSection,
  promiseSection,
  aboutTeamSection,
  aboutFaq,
} from '../data/site';

function Mission() {
  const m = missionSection;

  return (
    <Section>
      <Content>
        <TitleTag tag={m.tag} title={m.title} />

        <div className="mission">
          <Reveal className="mission__quote" lg>
            <p>{m.quote}</p>
          </Reveal>
          <Reveal className="mission__media" delay={120}>
            <img src={m.image} alt={m.imageAlt} loading="lazy" />
          </Reveal>
        </div>

        <div className="promise">
          <Reveal>
            <span className="tag">{m.promiseTag || promiseSection.tag}</span>
          </Reveal>
          <div className="promise-grid">
            {promiseSection.stats.map((stat, i) => (
              <Reveal className="promise-card" key={stat.label} delay={i * 80}>
                <span className="promise-card__value">{stat.value}</span>
                <span className="promise-card__label">{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </Content>
    </Section>
  );
}

function AboutTeam() {
  const t = aboutTeamSection;

  return (
    <Section id="team">
      <Content className="team team--about">
        <div className="team__grid">
          {t.members.map((member, i) => (
            <Reveal className="team-card" key={member.name} delay={(i % 2) * 80}>
              <div className="team-card__media">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <div className="team-card__body">
                <span className="team-card__name">{member.name}</span>
                <span className="team-card__role">{member.role}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="team__head">
          <TitleTag tag={t.tag} title={t.title} />
          <Reveal className="team__intro" delay={120}>
            <p>{t.text}</p>
            <Button to={t.cta.to} variant="dark">
              {t.cta.label}
            </Button>
          </Reveal>
        </div>
      </Content>
    </Section>
  );
}

export default function About() {
  return (
    <>
      <PageHero data={aboutHero} />
      <Mission />
      <AboutTeam />
      <ServicesSection />
      <FaqSection data={aboutFaq} />
    </>
  );
}

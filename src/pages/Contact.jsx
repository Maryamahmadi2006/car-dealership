import Reveal, { Words } from '../components/Reveal';
import PageHero from '../components/PageHero';
import FaqSection from '../components/FaqSection';
import LeadForm from '../components/LeadForm';
import { Content, Section, TitleTag } from '../components/Section';
import {
  IconMail,
  IconPhone,
  IconMap,
  IconClock,
} from '../components/Icons';
import { contactHero, contactForm, contactSection, contactFaq } from '../data/site';

const ICONS = { mail: IconMail, phone: IconPhone, map: IconMap, clock: IconClock };

function ContactHero() {
  return (
    <section className="section hero-plain hero-plain--contact">
      <div className="hero-plain__content hero-plain__content--split">
        <div className="hero-plain__left">
          <Reveal className="hero-plain__title">
            <h1>
              <Words text={contactHero.title} />
            </h1>
          </Reveal>

          <Reveal className="rating" delay={140}>
            <img className="rating__logo" src={`${import.meta.env.BASE_URL}images/google-logo.png`} alt="Google" />
            <span className="rating__score">{contactHero.rating.score}</span>
            <span className="rating__stars" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i}>★</span>
              ))}
            </span>
            <span className="rating__reviews">{contactHero.rating.reviews}</span>
          </Reveal>

          <Reveal className="hero-plain__intro hero-plain__intro--contact" delay={200}>
            <p>{contactHero.text}</p>
            <a
              className="icon-btn icon-btn--dark"
              href="https://www.google.com/maps/place/10500+NE+8th+St,+Bellevue,+WA+98004"
              target="_blank"
              rel="noreferrer"
              aria-label="Find us on the map"
            >
              <IconMap size={22} />
            </a>
          </Reveal>
        </div>

        <Reveal className="hero-plain__form" delay={120}>
          <LeadForm fields={contactForm.fields} submit={contactForm.submit} />
        </Reveal>
      </div>
    </section>
  );
}

function ContactInfo() {
  const c = contactSection;

  return (
    <Section>
      <Content className="contact-split">
        <Reveal className="contact-map" lg>
          <iframe
            src={c.mapUrl}
            title="Our showroom location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>

        <div className="contact-info">
          <TitleTag tag={c.tag} title={c.title} />
          <Reveal className="contact-info__text" delay={100}>
            <p>{c.text}</p>
          </Reveal>
          <div className="contact-cards">
            {c.items.map((item, i) => {
              const Icon = ICONS[item.icon] || IconMail;
              return (
                <Reveal className="contact-card" key={item.label} delay={i * 70}>
                  <span className="contact-card__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="contact-card__texts">
                    <span className="contact-card__label">{item.label}</span>
                    <span className="contact-card__value">{item.value}</span>
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Content>
    </Section>
  );
}

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <FaqSection data={contactFaq} />
    </>
  );
}

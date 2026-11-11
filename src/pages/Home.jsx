import { Link } from 'react-router-dom';
import Reveal, { Words } from '../components/Reveal';
import Button from '../components/Button';
import SearchBox from '../components/SearchBox';
import CarCard from '../components/CarCard';
import ServicesSection from '../components/ServicesSection';
import CtaSection from '../components/CtaSection';
import FaqSection from '../components/FaqSection';
import { Content, Section, SectionTop, TitleTag } from '../components/Section';
import { ArrowLeft, ArrowRight, IconCar, IconPrice, StarIcon } from '../components/Icons';
import {
  homeHero,
  featuredSection,
  testimonialsSection,
  homeTeamSection,
  blogSection,
  homeFaq,
} from '../data/site';
import { getCar } from '../data/vehicles';

const HERO_STATS_ICONS = { car: IconCar, price: IconPrice };

function HomeHero() {
  return (
    <Section className="section--hero">
      <div className="hero-home">
        <img className="hero-home__bg" src={`${import.meta.env.BASE_URL}images/hero-home.webp`} alt="" />
        <div className="hero-home__shade" aria-hidden="true" />

        <div className="hero-home__left">
          <Reveal className="hero-home__title">
            <h1>
              <Words text={homeHero.title} />
            </h1>
          </Reveal>
          <Reveal className="hero-home__intro" delay={160}>
            <p>{homeHero.text}</p>
            <Button to={homeHero.cta.to} variant="light">
              {homeHero.cta.label}
            </Button>
          </Reveal>
        </div>

        <div className="hero-home__right">
          <Reveal className="hero-home__search" delay={100}>
            <SearchBox />
          </Reveal>
          <Reveal className="hero-home__stats" delay={220}>
            {homeHero.stats.map((stat) => {
              const Icon = HERO_STATS_ICONS[stat.icon] || IconCar;
              return (
                <div className="stat-card" key={stat.label}>
                  <span className="stat-card__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="stat-card__texts">
                    <span className="stat-card__value">{stat.value}</span>
                    <span className="stat-card__label">{stat.label}</span>
                  </span>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Featured() {
  const cars = ['dreznak-karov', 'zethrux-infernum', 'emblora-wyndcroft'].map(getCar);

  return (
    <Section>
      <Content>
        <SectionTop>
          <TitleTag tag={featuredSection.tag} title={featuredSection.title} />
          <Reveal className="section-top__aside section-top__aside--stack" delay={100}>
            <Button to={featuredSection.cta.to} variant="dark">
              {featuredSection.cta.label}
            </Button>
            <p>{featuredSection.text}</p>
          </Reveal>
        </SectionTop>

        <div className="featured-grid">
          {cars.map((car, i) => (
            <Reveal key={car.slug} delay={i * 90}>
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      </Content>
    </Section>
  );
}

function Testimonials() {
  const t = testimonialsSection;

  return (
    <Section>
      <Content>
        <SectionTop>
          <TitleTag tag={t.tag} title={t.title} />
          <Reveal className="section-top__aside section-top__aside--stack" delay={100}>
            <Button to={t.cta.to} variant="dark">
              {t.cta.label}
            </Button>
            <p>{t.text}</p>
          </Reveal>
        </SectionTop>

        <div className="testi__row">
          <Reveal className="testi__slide" lg>
            <div className="testi__media">
              <img src={t.slide.image} alt={t.slide.name} loading="lazy" />
              <button className="testi__nav testi__nav--prev" aria-label="Previous testimonial">
                <ArrowLeft />
              </button>
              <button className="testi__nav testi__nav--next" aria-label="Next testimonial">
                <ArrowRight />
              </button>
            </div>
            <div className="testi__body">
              <p className="testi__quote">“{t.slide.quote}”</p>
              <div className="testi__who">
                <span className="testi__name">{t.slide.name}</span>
                <span className="testi__role">{t.slide.role}</span>
              </div>
            </div>
          </Reveal>

          <div className="testi__side">
            <Reveal className="testi-stat testi-stat--a" delay={80}>
              <span className="testi-stat__value">{t.stats[0].value}</span>
              <span className="testi-stat__label">{t.stats[0].label}</span>
            </Reveal>
            <Reveal className="testi-stat testi-stat--b" delay={140}>
              <span className="testi-stat__value">{t.stats[1].value}</span>
              <span className="testi-stat__label">{t.stats[1].label}</span>
            </Reveal>
            <Reveal className="testi-rating" delay={200}>
              <div className="testi-rating__top">
                <img className="testi-rating__logo" src={`${import.meta.env.BASE_URL}images/google-logo.png`} alt="Google" loading="lazy" />
                <span className="testi-rating__score">{t.rating.score}</span>
                <span className="testi-rating__stars" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} size={14} />
                  ))}
                </span>
              </div>
              <span className="testi-rating__label">{t.rating.reviews}</span>
            </Reveal>
          </div>
        </div>
      </Content>
    </Section>
  );
}

function Team() {
  const t = homeTeamSection;

  return (
    <Section>
      <Content className="team">
        <div className="team__cards">
          {t.members.map((member, i) => (
            <Reveal
              className={`team-card${member.tall ? ' team-card--tall' : ''}`}
              key={member.name}
              delay={i * 100}
            >
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

function Blog() {
  const b = blogSection;

  return (
    <Section id="blog">
      <Content>
        <div className="blog">
          <div className="blog__head">
            <TitleTag tag={b.tag} title={b.title} />
            <Reveal className="blog__intro" delay={100}>
              <p>{b.text}</p>
              <Button to={b.cta.to} variant="dark">
                {b.cta.label}
              </Button>
            </Reveal>
          </div>

          <div className="blog__cards">
            {b.posts.map((post, i) => (
              <Reveal className="blog-card" key={post.title} delay={i * 100}>
                <img src={post.image} alt="" loading="lazy" />
                <div className="blog-card__shade" aria-hidden="true" />
                <span className="blog-card__arrow" aria-hidden="true">
                  <ArrowRight size={20} />
                </span>
                <div className="blog-card__body">
                  <span className="blog-card__date">{post.date}</span>
                  <span className="blog-card__title">{post.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Content>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <Featured />
      <ServicesSection />
      <Testimonials />
      <Team />
      <Blog />
      <CtaSection />
      <FaqSection data={homeFaq} />
    </>
  );
}

import Reveal, { Words } from './Reveal';
import Button from './Button';
import {
  IconPrice,
  IconCar,
  IconOwners,
  IconCheck,
  IconMap,
  StarIcon,
} from './Icons';
import { contactHero } from '../data/site';

const ICONS = {
  price: IconPrice,
  car: IconCar,
  owners: IconOwners,
  check: IconCheck,
};

const MAP_URL =
  'https://www.google.com/maps/place/10500+NE+8th+St,+Bellevue,+WA+98004';

/**
 * Plain (imageless) page hero: H1 top-left, intro + CTA bottom-left,
 * stat cards bottom-right. Contact variant swaps stats for a Google
 * rating block and adds a map-pin quick action.
 */
export default function PageHero({ data, children }) {
  const isContact = Boolean(data.rating);

  return (
    <section className="section hero-plain">
      <div className="hero-plain__content">
        <div className="hero-plain__top">
          <Reveal className="hero-plain__title">
            <h1>
              <Words text={data.title} />
            </h1>
          </Reveal>

          {isContact && (
            <Reveal className="rating" delay={140}>
              <img className="rating__logo" src={`${import.meta.env.BASE_URL}images/google-logo.png`} alt="Google" />
              <span className="rating__score">{data.rating.score}</span>
              <span className="rating__stars" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <span className="rating__reviews">{data.rating.reviews}</span>
            </Reveal>
          )}

          {children}
        </div>

        <div className="hero-plain__bottom">
          <Reveal className="hero-plain__intro" delay={120}>
            <p>{data.text}</p>
            {data.cta && (
              <div className="hero-plain__cta">
                {data.cta.to ? (
                  <Button to={data.cta.to} variant="dark">{data.cta.label}</Button>
                ) : (
                  <Button href={data.cta.href} variant="dark">{data.cta.label}</Button>
                )}
                {isContact && (
                  <a
                    className="icon-btn icon-btn--dark"
                    href={MAP_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Find us on the map"
                  >
                    <IconMap />
                  </a>
                )}
              </div>
            )}
          </Reveal>

          {data.stats && (
            <Reveal className="hero-plain__stats" delay={180}>
              {data.stats.map((stat) => {
                const Icon = ICONS[stat.icon] || IconCheck;
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
          )}
        </div>
      </div>
    </section>
  );
}

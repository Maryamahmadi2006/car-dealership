import { Link } from 'react-router-dom';
import Button from './Button';
import Reveal, { Words } from './Reveal';
import { IconPhone, IconMap } from './Icons';
import { footerLinks, legalLinks } from '../data/site';

const MAP_URL =
  'https://www.google.com/maps/place/10500+NE+8th+St,+Bellevue,+WA+98004';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__main">
          <Reveal className="footer__intro">
            <h2>
              <Words text="Ready to test your dream car?" />
            </h2>
            <p>
              Curated luxury vehicles from the world&apos;s most prestigious brands since 2010
            </p>
            <div className="footer__ctas">
              <Button to="/contact" variant="dark">Contact us</Button>
              <div className="footer__contact-links">
                <a className="icon-btn" href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Find us on the map">
                  <IconMap />
                </a>
                <a className="icon-btn" href="tel:+14255550142" aria-label="Call us">
                  <IconPhone />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="footer__links" delay={120}>
            <div className="footer__col">
              {footerLinks.left.map((link) => (
                <Link key={link.label} to={link.to}>{link.label}</Link>
              ))}
            </div>
            <div className="footer__col">
              {footerLinks.right.map((link) => (
                <Link key={link.label} to={link.to}>{link.label}</Link>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="footer__brand" lg>
          <span>CAR DEALERSHIP</span>
        </Reveal>

        <Reveal className="footer__bottom" delay={100}>
          <div className="footer__copy">
            © 2024 CAR DEALERSHIP - ALL RIGHTS RESERVED
          </div>
          <div className="footer__legal">
            <span className="footer__credit">
              Made By{' '}
              <a href="https://marketplace.framer.com/@akem-design/" target="_blank" rel="noreferrer">
                Akem
              </a>{' '}
              in{' '}
              <a href="https://framer.link/akem-design" target="_blank" rel="noreferrer">Framer</a>
            </span>
            {legalLinks.map((link, i) => (
              <span key={link.label}>
                {i > 0 && ' | '}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

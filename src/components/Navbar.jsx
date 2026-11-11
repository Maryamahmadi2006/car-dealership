import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { navLinks } from '../data/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__content">
        <Link className="nav__logo" to="/" aria-label="CAR DEALERSHIP home">
          <img src={`${import.meta.env.BASE_URL}images/logo.svg`} alt="CAR DEALERSHIP" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) => `nav-pill${isActive ? ' is-active' : ''}`}
            >
              <span className="nav-pill__shine" aria-hidden="true" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__cta">
          <Button to="/contact" variant="dark">Contact Sales</Button>
        </div>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__mobile ${open ? 'is-open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) => `nav-pill${isActive ? ' is-active' : ''}`}
            onClick={() => setOpen(false)}
          >
            <span className="nav-pill__shine" aria-hidden="true" />
            {link.label}
          </NavLink>
        ))}
        <Button to="/contact" variant="dark" onClick={() => setOpen(false)}>
          Contact Sales
        </Button>
      </div>
    </header>
  );
}

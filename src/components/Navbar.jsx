import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { useStore } from '../context/StoreContext';

const homeLink = { label: 'Home', to: '/' };

const guestLinks = [
  homeLink,
  { label: 'Inventory', to: '/inventory' },
  { label: 'About', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
  { label: 'Login', to: '/login' },
];

const buyerLinks = [
  homeLink,
  { label: 'Inventory', to: '/inventory' },
  { label: 'Favorites', to: '/favorites' },
  { label: 'My Dashboard', to: '/dashboard' },
  { label: 'My Profile', to: '/profile' },
];

const sellerLinks = [
  homeLink,
  { label: 'My Dashboard', to: '/seller' },
  { label: 'My Listings', to: '/seller/listings' },
  { label: 'Add Car', to: '/seller/add-car' },
  { label: 'My Profile', to: '/profile' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useStore();

  const links = !user ? guestLinks : user.role === 'buyer' ? buyerLinks : sellerLinks;

  const handleLogout = () => {
    setOpen(false);
    logout();
    // Full reload avoids a protected-route redirect racing the logout state.
    window.location.replace(import.meta.env.BASE_URL);
  };

  const cta = user ? (
    <button type="button" className="btn btn--dark nav__logout" onClick={handleLogout}>
      <span className="btn__shine" aria-hidden="true" />
      <span className="btn__label">Logout</span>
    </button>
  ) : (
    <Button to="/register" variant="dark">Register</Button>
  );

  return (
    <header className="nav">
      <div className="nav__content">
        <Link className="nav__logo" to="/" aria-label="CAR DEALERSHIP home">
          <img src={`${import.meta.env.BASE_URL}images/logo.svg`} alt="CAR DEALERSHIP" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-pill${isActive ? ' is-active' : ''}`}
            >
              <span className="nav-pill__shine" aria-hidden="true" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__cta">{cta}</div>

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
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => `nav-pill${isActive ? ' is-active' : ''}`}
            onClick={() => setOpen(false)}
          >
            <span className="nav-pill__shine" aria-hidden="true" />
            {link.label}
          </NavLink>
        ))}
        {user ? (
          <button type="button" className="btn btn--dark nav__logout" onClick={handleLogout}>
            <span className="btn__shine" aria-hidden="true" />
            <span className="btn__label">Logout</span>
          </button>
        ) : (
          <Button to="/register" variant="dark" onClick={() => setOpen(false)}>
            Register
          </Button>
        )}
      </div>
    </header>
  );
}

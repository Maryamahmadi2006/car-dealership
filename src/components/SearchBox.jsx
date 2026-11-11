import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon } from './Icons';
import { vehicles } from '../data/vehicles';

/** Hero search pill with live results dropdown (links to vehicle pages). */
export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  const q = query.trim().toLowerCase();
  const results = q
    ? vehicles.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.make.toLowerCase().includes(q) ||
          v.type.toLowerCase().includes(q)
      )
    : [];

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="search" ref={wrapRef}>
      <form
        className="search__bar"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) {
            setOpen(false);
            setQuery('');
            navigate(`/inventory/${results[0].slug}`);
          }
        }}
      >
        <input
          className="search__input"
          type="search"
          value={query}
          placeholder="Search cars..."
          aria-label="Search cars"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <button className="search__btn" type="submit" aria-label="Search">
          <SearchIcon />
        </button>
      </form>

      {open && q && (
        <div className="search__drop">
          {results.length > 0 ? (
            results.slice(0, 5).map((car) => (
              <Link
                key={car.slug}
                className="search__item"
                to={`/inventory/${car.slug}`}
                onClick={() => {
                  setOpen(false);
                  setQuery('');
                }}
              >
                <img src={car.image} alt="" loading="lazy" />
                <span className="search__item-name">{car.name}</span>
                <span className="search__item-price">$ {car.price}</span>
              </Link>
            ))
          ) : (
            <div className="search__empty">No vehicles match “{query}”</div>
          )}
        </div>
      )}
    </div>
  );
}

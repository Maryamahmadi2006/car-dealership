import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CarCard from '../components/CarCard';
import CtaSection from '../components/CtaSection';
import Reveal from '../components/Reveal';
import { Content, Section } from '../components/Section';
import { SearchIcon } from '../components/Icons';
import { inventoryHero } from '../data/site';
import { useStore } from '../context/StoreContext';
import { listingTitle, toCard } from '../lib/listings';

const CONDITIONS = ['New', 'As New', 'Excellent', 'Used'];
const TYPE_ORDER = ['SUV', 'Coupe', 'Convertible', 'Estate', 'Sedan', 'Hatchback', 'Truck'];
const PRICE_RANGES = [
  { id: '50k-100k', label: '50k-100k', min: 50000, max: 100000 },
  { id: '100k-200k', label: '100k-200k', min: 100000, max: 200000 },
  { id: 'over-200K', label: 'over-200K', min: 200000, max: Infinity },
];

const toNumber = (price) => Number(String(price).replace(/,/g, ''));

export default function InventoryPage() {
  const { listings, user, isFavorite, toggleFavorite } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [make, setMake] = useState('All');
  const [model, setModel] = useState('');
  const [condition, setCondition] = useState('All');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [ranges, setRanges] = useState([]);
  const [type, setType] = useState('All');

  const available = useMemo(
    () => listings.filter((listing) => listing.status === 'available'),
    [listings]
  );

  const makes = useMemo(
    () => ['All', ...Array.from(new Set(available.map((listing) => listing.make))).sort()],
    [available]
  );

  const types = useMemo(() => {
    const present = Array.from(new Set(available.map((listing) => listing.type)));
    const ordered = TYPE_ORDER.filter((item) => present.includes(item));
    return ['All', ...ordered, ...present.filter((item) => !TYPE_ORDER.includes(item))];
  }, [available]);

  const conditions = useMemo(() => {
    const present = Array.from(new Set(available.map((listing) => listing.condition)));
    return ['All', ...CONDITIONS.filter((item) => present.includes(item)), ...present.filter((item) => !CONDITIONS.includes(item))];
  }, [available]);

  const toggleRange = (id) =>
    setRanges((prev) =>
      prev.includes(id) ? prev.filter((range) => range !== id) : [...prev, id]
    );

  const reset = () => {
    setSearch('');
    setMake('All');
    setModel('');
    setCondition('All');
    setYear('');
    setMileage('');
    setRanges([]);
    setType('All');
  };

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const activeRanges = PRICE_RANGES.filter((range) => ranges.includes(range.id));

    return available.filter((listing) => {
      const price = toNumber(listing.price);
      const title = listingTitle(listing).toLowerCase();
      if (
        query &&
        !title.includes(query) &&
        !listing.make.toLowerCase().includes(query) &&
        !String(listing.model).toLowerCase().includes(query)
      )
        return false;
      if (make !== 'All' && listing.make !== make) return false;
      if (model.trim() && !String(listing.model).toLowerCase().includes(model.trim().toLowerCase()))
        return false;
      if (condition !== 'All' && listing.condition !== condition) return false;
      if (year && String(listing.year) !== year.trim()) return false;
      if (mileage && listing.mileage > Number(mileage)) return false;
      if (type !== 'All' && listing.type !== type) return false;
      if (activeRanges.length && !activeRanges.some((range) => price >= range.min && price <= range.max))
        return false;
      return true;
    });
  }, [available, search, make, model, condition, year, mileage, ranges, type]);

  const canFavorite = user?.role !== 'seller';

  const handleFavorite = (listing) => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    toggleFavorite(listing.id);
  };

  return (
    <>
      <PageHero data={inventoryHero} />

      <Section id="filters">
        <Content className="filters">
          <aside className="filters__side">
            <Reveal>
              <h2 className="filters__title">Filters</h2>
            </Reveal>

            <Reveal className="filters__group" delay={60}>
              <div className="filters__search">
                <SearchIcon size={18} />
                <input
                  type="search"
                  placeholder="Search..."
                  aria-label="Search inventory"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </Reveal>

            <Reveal className="filters__group" delay={100}>
              <label className="filters__label" htmlFor="f-make">Make</label>
              <div className="filters__select">
                <select id="f-make" value={make} onChange={(event) => setMake(event.target.value)}>
                  {makes.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <span className="field__chevron" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal className="filters__group" delay={120}>
              <label className="filters__label" htmlFor="f-model">Model</label>
              <input
                id="f-model"
                className="filters__input"
                type="text"
                placeholder="Any model"
                value={model}
                onChange={(event) => setModel(event.target.value)}
              />
            </Reveal>

            <Reveal className="filters__group" delay={140}>
              <label className="filters__label" htmlFor="f-condition">Condition</label>
              <div className="filters__select">
                <select
                  id="f-condition"
                  value={condition}
                  onChange={(event) => setCondition(event.target.value)}
                >
                  {conditions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <span className="field__chevron" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal className="filters__group filters__group--row" delay={180}>
              <div>
                <label className="filters__label" htmlFor="f-year">Year</label>
                <input
                  id="f-year"
                  className="filters__input"
                  type="text"
                  inputMode="numeric"
                  placeholder="2024"
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                />
              </div>
              <div>
                <label className="filters__label" htmlFor="f-mileage">Max Mileage</label>
                <input
                  id="f-mileage"
                  className="filters__input"
                  type="number"
                  min="0"
                  placeholder="10000"
                  value={mileage}
                  onChange={(event) => setMileage(event.target.value)}
                />
              </div>
            </Reveal>

            <Reveal className="filters__group" delay={220}>
              <span className="filters__label">Price Range</span>
              <div className="filters__checks">
                {PRICE_RANGES.map((range) => (
                  <label className="check" key={range.id}>
                    <input
                      type="checkbox"
                      checked={ranges.includes(range.id)}
                      onChange={() => toggleRange(range.id)}
                    />
                    <span className="check__box" aria-hidden="true" />
                    <span className="check__label">{range.label}</span>
                  </label>
                ))}
              </div>
            </Reveal>
          </aside>

          <div className="filters__main">
            <div className="type-pills" role="tablist" aria-label="Body type">
              {types.map((item) => (
                <button
                  key={item}
                  className={`type-pill${type === item ? ' is-active' : ''}`}
                  onClick={() => setType(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>

            {results.length > 0 ? (
              <>
                <p className="inventory-count">
                  {results.length} {results.length === 1 ? 'vehicle' : 'vehicles'} available
                </p>
                <div className="inventory-grid">
                  {results.map((listing, index) => {
                    const card = toCard(listing);
                    return (
                      <Reveal key={listing.id} delay={(index % 4) * 70}>
                        <CarCard
                          car={card}
                          favorite={isFavorite(listing.id)}
                          onToggleFavorite={
                            canFavorite ? () => handleFavorite(listing) : undefined
                          }
                        />
                      </Reveal>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="inventory-empty">
                <h3>No vehicles found</h3>
                <p>No vehicles match your filters. Try widening your search.</p>
                <button type="button" onClick={reset}>
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </Content>
      </Section>

      <CtaSection />
    </>
  );
}

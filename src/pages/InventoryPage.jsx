import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero';
import CarCard from '../components/CarCard';
import CtaSection from '../components/CtaSection';
import Reveal from '../components/Reveal';
import { Content, Section } from '../components/Section';
import { SearchIcon } from '../components/Icons';
import { inventoryHero } from '../data/site';
import { vehicles } from '../data/vehicles';

const TYPES = ['All', 'SUV', 'Coupe', 'Convertible', 'Estate'];
const MAKES = [
  'All',
  'Veltora',
  'Krynox',
  'Dreznak',
  'Soliven',
  'Pharyx',
  'Emblora',
  'Zethrux',
  'Aurvane',
];
const CONDITIONS = ['All', 'New', 'As New', 'Excellent', 'Used'];
const PRICE_RANGES = [
  { id: '50k-100k', label: '50k-100k', min: 50000, max: 100000 },
  { id: '100k-200k', label: '100k-200k', min: 100000, max: 200000 },
  { id: 'over-200K', label: 'over-200K', min: 200000, max: Infinity },
];

const toNumber = (price) => Number(String(price).replace(/,/g, ''));

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [make, setMake] = useState('All');
  const [condition, setCondition] = useState('All');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [ranges, setRanges] = useState([]);
  const [type, setType] = useState('All');

  const toggleRange = (id) =>
    setRanges((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    const activeRanges = PRICE_RANGES.filter((r) => ranges.includes(r.id));

    return vehicles.filter((car) => {
      const price = toNumber(car.price);
      if (q && !car.name.toLowerCase().includes(q) && !car.make.toLowerCase().includes(q)) return false;
      if (make !== 'All' && car.make !== make) return false;
      if (condition !== 'All' && car.condition !== condition) return false;
      if (year && car.year !== year.trim()) return false;
      if (mileage && car.mileage > Number(mileage)) return false;
      if (type !== 'All' && car.type !== type) return false;
      if (
        activeRanges.length &&
        !activeRanges.some((r) => price >= r.min && price <= r.max)
      )
        return false;
      return true;
    });
  }, [search, make, condition, year, mileage, ranges, type]);

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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Reveal>

            <Reveal className="filters__group" delay={100}>
              <label className="filters__label" htmlFor="f-make">Make</label>
              <div className="filters__select">
                <select id="f-make" value={make} onChange={(e) => setMake(e.target.value)}>
                  {MAKES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <span className="field__chevron" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal className="filters__group" delay={140}>
              <label className="filters__label" htmlFor="f-condition">Condition</label>
              <div className="filters__select">
                <select
                  id="f-condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
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
                  onChange={(e) => setYear(e.target.value)}
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
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
            </Reveal>

            <Reveal className="filters__group" delay={220}>
              <span className="filters__label">Price Range</span>
              <div className="filters__checks">
                {PRICE_RANGES.map((r) => (
                  <label className="check" key={r.id}>
                    <input
                      type="checkbox"
                      checked={ranges.includes(r.id)}
                      onChange={() => toggleRange(r.id)}
                    />
                    <span className="check__box" aria-hidden="true" />
                    <span className="check__label">{r.label}</span>
                  </label>
                ))}
              </div>
            </Reveal>
          </aside>

          <div className="filters__main">
            <div className="type-pills" role="tablist" aria-label="Body type">
              {TYPES.map((t) => (
                <button
                  key={t}
                  className={`type-pill${type === t ? ' is-active' : ''}`}
                  onClick={() => setType(t)}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>

            {results.length > 0 ? (
              <div className="inventory-grid">
                {results.map((car, i) => (
                  <Reveal key={car.slug} delay={(i % 4) * 70}>
                    <CarCard car={car} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="inventory-empty">
                <p>No vehicles match your filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setMake('All');
                    setCondition('All');
                    setYear('');
                    setMileage('');
                    setRanges([]);
                    setType('All');
                  }}
                >
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

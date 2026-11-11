import Button from './Button';
import Reveal from './Reveal';

const initialsOf = (name) =>
  String(name || 'CAR DEALERSHIP')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function SellerPanel({ seller, price, status, onContact }) {
  const sold = status === 'sold';

  return (
    <section className="section">
      <div className="section__inner">
        <Reveal className="seller-panel">
          <div className="seller-panel__identity">
            <span className="avatar avatar--lg" aria-hidden="true">
              {initialsOf(seller?.name)}
            </span>
            <div className="seller-panel__texts">
              <span className="tag">Seller information</span>
              <h2>{seller?.name || 'CAR DEALERSHIP'}</h2>
              <p>{seller?.location || 'Bellevue, WA'}</p>
            </div>
          </div>

          <div className="seller-panel__meta">
            <span className={`status-pill is-${sold ? 'sold' : 'available'}`}>
              {sold ? 'Sold' : 'Available'}
            </span>
            <span className="seller-panel__price">$ {price}</span>
            {seller?.email && (
              <a className="seller-panel__mail" href={`mailto:${seller.email}`}>
                {seller.email}
              </a>
            )}
          </div>

          <Button variant="dark" onClick={onContact} disabled={sold}>
            {sold ? 'Vehicle sold' : 'Contact Seller'}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

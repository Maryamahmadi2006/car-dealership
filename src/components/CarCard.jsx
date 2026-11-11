import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

/**
 * Vehicle card: image with arrow notch at the bottom-right corner,
 * name + price row, year + badge row. Used on Home and Inventory.
 */
export default function CarCard({ car }) {
  return (
    <Link className="car-card" to={`/inventory/${car.slug}`}>
      <div className="car-card__media">
        <img src={car.image} alt={car.alt} loading="lazy" />
        <span className="car-card__notch" aria-hidden="true">
          <span className="car-card__arrow">
            <ArrowRight size={20} />
          </span>
        </span>
      </div>
      <div className="car-card__body">
        <div className="car-card__row">
          <span className="car-card__name">{car.name}</span>
          <span className="car-card__price">$ {car.price}</span>
        </div>
        <div className="car-card__row">
          <span className="car-card__year">{car.year}</span>
          {car.badge && <span className="car-card__badge">{car.badge}</span>}
        </div>
      </div>
    </Link>
  );
}

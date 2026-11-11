import Button from './Button';
import Reveal, { Words } from './Reveal';
import CarCard from './CarCard';
import { featuredSlugs, getCar } from '../data/vehicles';

export default function FeaturedCars() {
  const cars = featuredSlugs.map(getCar);
  const loop = [...cars, ...cars];

  return (
    <section className="section">
      <div className="section__inner">
        <Reveal className="featured__top">
          <div className="featured__titles">
            <span className="tag">Featured Cars</span>
            <h2>
              <Words text="Cars You May Like" />
            </h2>
          </div>
          <Button to="/inventory" variant="dark">Browse Inventory</Button>
        </Reveal>

        <div className="marquee">
          <div className="marquee__track">
            {loop.map((car, i) => (
              <div className="marquee__item" key={`${car.slug}-${i}`}>
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

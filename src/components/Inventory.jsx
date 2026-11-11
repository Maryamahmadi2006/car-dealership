import { useState } from 'react';
import Reveal, { Words } from './Reveal';
import { ArrowLeft, ArrowRight } from './Icons';

function Gallery({ shots }) {
  const [index, setIndex] = useState(0);
  const total = shots.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="carousel">
      <div className="carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {shots.map((shot, i) => (
          <div className="carousel__slide" key={shot.src + i}>
            <img src={shot.src} alt={shot.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      {total > 1 && (
        <>
          <div className="carousel__counter">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <div className="carousel__nav">
            <button className="carousel__btn" onClick={prev} aria-label="Previous image">
              <ArrowLeft />
            </button>
            <button className="carousel__btn" onClick={next} aria-label="Next image">
              <ArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`accordion ${open ? 'is-open' : ''}`}>
      <button
        className="accordion__head"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="accordion__title">{title}</span>
        <span className="accordion__icon" aria-hidden="true" />
      </button>
      <div className="accordion__panel">{children}</div>
    </div>
  );
}

export default function Inventory({ vehicle }) {
  return (
    <section className="section" id="inventory">
      <div className="section__inner">
        <div className="gallery-specs">
          <Reveal className="gallery">
            <Gallery shots={vehicle.gallery} />
          </Reveal>

          <div className="specs">
            <Reveal className="specs__head">
              <span className="tag">Vehicule Details</span>
              <h2>
                <Words text="Specs" />
              </h2>
            </Reveal>

            <Reveal className="specs__grid" delay={120}>
              {vehicle.vehicleDetails.map((spec) => (
                <div className="spec-item" key={spec.label}>
                  <span className="spec-item__label">{spec.label}</span>
                  <span className="spec-item__value">{spec.value}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="accordions" delay={200}>
              {vehicle.accordions.map((group) => (
                <Accordion key={group.title} title={group.title} defaultOpen>
                  {group.kind === 'features' ? (
                    <ul className="features">
                      {group.items.map((feature) => (
                        <li key={feature.value}>{feature.value}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="accordion__rows">
                      {group.items.map((row) => (
                        <div className="spec-row" key={`${group.title}-${row.label}`}>
                          <span className="spec-row__label">{row.label}</span>
                          <span className="spec-row__value">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Accordion>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

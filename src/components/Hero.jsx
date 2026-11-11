import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Reveal, { Words } from './Reveal';
import { quickIcons, IconHeart } from './Icons';

function CopyButton({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className="btn btn--pill" onClick={handleCopy}>
      {copied ? `${label} Copied!` : `Copy ${label}`}
    </button>
  );
}

export default function Hero({ vehicle, favorite, onToggleFavorite, onContact }) {
  const sold = vehicle.status === 'sold';

  return (
    <section className="hero" id="top">
      <div className="hero__content">
        <div className="hero__left">
          <Reveal className="hero__title">
            <div className="hero__breadcrumb tag">
              <Link to="/inventory">Inventory</Link>
              <span>-</span>
              <span>{vehicle.category}</span>
              {sold && <span className="status-pill is-sold">Sold</span>}
            </div>
            <h1>
              <Words text={vehicle.name} />
            </h1>
          </Reveal>

          <div className="hero__body">
            <Reveal className="hero__text" delay={150}>
              <p>{vehicle.description}</p>
              <div className="hero__actions">
                <Button variant="dark" onClick={onContact} disabled={sold}>
                  {sold ? 'Vehicle sold' : 'Contact Seller'}
                </Button>
                {onToggleFavorite && (
                  <button
                    type="button"
                    className={`btn btn--pill wl-btn${favorite ? ' is-active' : ''}`}
                    onClick={onToggleFavorite}
                    aria-pressed={favorite}
                  >
                    <IconHeart size={18} filled={favorite} />
                    {favorite ? 'Saved' : 'Wishlist'}
                  </button>
                )}
                {vehicle.vin && <CopyButton label="VIN" value={vehicle.vin} />}
                <CopyButton label="Stock" value={vehicle.stock} />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="hero__right">
          <Reveal delay={250}>
            <img
              className="hero__image"
              src={vehicle.image}
              alt={vehicle.imageAlt}
              width="1536"
              height="1024"
            />
          </Reveal>

          <Reveal className="quick-infos" delay={400}>
            {vehicle.quickInfos.map((info) => {
              const Icon = quickIcons[info.icon];
              return (
                <div className="quick-info" key={info.icon}>
                  <span className="quick-info__icon">
                    <Icon />
                  </span>
                  <span className="quick-info__value">
                    {info.value}
                    {info.suffix ? ` ${info.suffix}` : ''}
                  </span>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

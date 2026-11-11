import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ManageListings from '../components/ManageListings';
import Reveal from '../components/Reveal';
import { Content, Section } from '../components/Section';
import { IconCar, IconCheck, IconTag } from '../components/Icons';
import { useStore } from '../context/StoreContext';

export default function SellerDashboard() {
  const { user, myListings, deleteListing, setListingStatus } = useStore();
  const [flash, setFlash] = useState(null);
  const firstName = user.fullName.split(' ')[0];

  const available = myListings.filter((listing) => listing.status === 'available').length;
  const sold = myListings.filter((listing) => listing.status === 'sold').length;

  const handleDelete = (id) => {
    const result = deleteListing(id);
    setFlash(
      result.ok
        ? { type: 'success', text: 'Listing deleted and removed from the inventory.' }
        : { type: 'error', text: result.error }
    );
  };

  const handleStatus = (id, status) => {
    const result = setListingStatus(id, status);
    setFlash(
      result.ok
        ? {
            type: 'success',
            text: status === 'sold' ? 'Listing marked as sold.' : 'Listing is available again.',
          }
        : { type: 'error', text: result.error }
    );
  };

  return (
    <Section className="dash">
      <Content>
        <Reveal className="dash-head">
          <div className="dash-head__text">
            <span className="tag">Seller Dashboard</span>
            <h1>Welcome back, {firstName}.</h1>
            <p>Publish new cars, keep your listings current, and track what is selling.</p>
          </div>
          <div className="dash-head__actions">
            <Button to="/seller/add-car" variant="dark">Add New Car</Button>
          </div>
        </Reveal>

        <Reveal className="dash-stats" delay={80}>
          <div className="stat-card">
            <span className="stat-card__icon" aria-hidden="true"><IconCar /></span>
            <span className="stat-card__texts">
              <span className="stat-card__value">{myListings.length}</span>
              <span className="stat-card__label">Total listings</span>
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-card__icon" aria-hidden="true"><IconCheck /></span>
            <span className="stat-card__texts">
              <span className="stat-card__value">{available}</span>
              <span className="stat-card__label">Available cars</span>
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-card__icon" aria-hidden="true"><IconTag /></span>
            <span className="stat-card__texts">
              <span className="stat-card__value">{sold}</span>
              <span className="stat-card__label">Sold cars</span>
            </span>
          </div>
        </Reveal>

        {flash && (
          <p className={`form-msg form-msg--${flash.type}`} role={flash.type === 'error' ? 'alert' : 'status'}>
            {flash.text}
          </p>
        )}

        <Reveal className="dash-section" delay={120}>
          <div className="dash-section__head">
            <h2>Manage Listings</h2>
            <Link className="text-link" to="/seller/listings">
              My Listings →
            </Link>
          </div>
          <ManageListings
            listings={myListings}
            onDelete={handleDelete}
            onToggleStatus={handleStatus}
          />
        </Reveal>
      </Content>
    </Section>
  );
}

import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import ManageListings from '../components/ManageListings';
import Reveal from '../components/Reveal';
import { Content, Section } from '../components/Section';
import { useStore } from '../context/StoreContext';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'available', label: 'Available' },
  { id: 'sold', label: 'Sold' },
];

export default function SellerListings() {
  const { myListings, deleteListing, setListingStatus } = useStore();
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [flash, setFlash] = useState(
    location.state?.flash ? { type: 'success', text: location.state.flash } : null
  );

  const listings = useMemo(
    () =>
      filter === 'all'
        ? myListings
        : myListings.filter((listing) => listing.status === filter),
    [filter, myListings]
  );

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
            <span className="tag">Seller</span>
            <h1>My listings.</h1>
            <p>
              {myListings.length} {myListings.length === 1 ? 'car' : 'cars'} published ·{' '}
              {myListings.filter((listing) => listing.status === 'available').length} available ·{' '}
              {myListings.filter((listing) => listing.status === 'sold').length} sold
            </p>
          </div>
          <div className="dash-head__actions">
            <Button to="/seller/add-car" variant="dark">Add New Car</Button>
          </div>
        </Reveal>

        {flash && (
          <p className={`form-msg form-msg--${flash.type}`} role={flash.type === 'error' ? 'alert' : 'status'}>
            {flash.text}
          </p>
        )}

        <div className="type-pills" role="tablist" aria-label="Listing status">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`type-pill${filter === item.id ? ' is-active' : ''}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Reveal className="dash-section" delay={80}>
          <ManageListings
            listings={listings}
            onDelete={handleDelete}
            onToggleStatus={handleStatus}
          />
        </Reveal>
      </Content>
    </Section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import EmptyState from './EmptyState';
import { IconEdit, IconTrash, IconCar } from './Icons';
import { listingPrice, listingTitle } from '../lib/listings';
import { formatNumber } from '../lib/storage';

export default function ManageListings({ listings, onDelete, onToggleStatus }) {
  const [pending, setPending] = useState(null);

  if (!listings.length) {
    return (
      <EmptyState
        icon={<IconCar />}
        title="No listings yet"
        text="Publish your first car and it will appear in the main inventory straight away."
        to="/seller/add-car"
        action="Add New Car"
      />
    );
  }

  return (
    <>
      <div className="manage-list">
        {listings.map((listing) => (
          <article className="manage-row" key={listing.id}>
            <img
              className="manage-row__thumb"
              src={listing.image}
              alt={listingTitle(listing)}
              loading="lazy"
            />
            <div className="manage-row__info">
              <Link to={`/inventory/${listing.slug}`} className="manage-row__title">
                {listingTitle(listing)}
              </Link>
              <span className="manage-row__meta">
                {listing.year} · {formatNumber(listing.mileage)} mi · {listing.location}
              </span>
            </div>
            <span className="manage-row__price">$ {listingPrice(listing)}</span>
            <span className={`status-pill is-${listing.status}`}>
              {listing.status === 'sold' ? 'Sold' : 'Available'}
            </span>
            <div className="manage-row__actions">
              <button
                type="button"
                className="mini-btn"
                onClick={() =>
                  onToggleStatus(listing.id, listing.status === 'sold' ? 'available' : 'sold')
                }
              >
                {listing.status === 'sold' ? 'Mark available' : 'Mark sold'}
              </button>
              <Link className="mini-btn" to={`/seller/edit/${listing.id}`}>
                <IconEdit /> Edit
              </Link>
              <button
                type="button"
                className="mini-btn mini-btn--danger"
                onClick={() => setPending(listing)}
              >
                <IconTrash /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(pending)}
        title="Delete this listing?"
        text={
          pending
            ? `"${listingTitle(pending)}" will be removed from your listings and the main inventory. This cannot be undone.`
            : ''
        }
        confirmLabel="Delete listing"
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending) onDelete(pending.id);
          setPending(null);
        }}
      />
    </>
  );
}

import Button from '../components/Button';
import Reveal from '../components/Reveal';
import CarCard from '../components/CarCard';
import EmptyState from '../components/EmptyState';
import { Content, Section } from '../components/Section';
import { IconHeart } from '../components/Icons';
import { useStore } from '../context/StoreContext';
import { toCard } from '../lib/listings';

export default function Favorites() {
  const { user, listings, favoriteIds, isFavorite, toggleFavorite } = useStore();

  const cars = favoriteIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);

  return (
    <Section className="dash">
      <Content>
        <Reveal className="dash-head">
          <div className="dash-head__text">
            <span className="tag">Buyer</span>
            <h1>Your favorites.</h1>
            <p>
              {cars.length
                ? `${cars.length} ${cars.length === 1 ? 'car' : 'cars'} saved to ${user.fullName.split(' ')[0]}'s wishlist.`
                : 'Save the cars you love and compare them in one place.'}
            </p>
          </div>
          <div className="dash-head__actions">
            <Button to="/inventory" variant="dark">Browse Inventory</Button>
          </div>
        </Reveal>

        {cars.length ? (
          <div className="inventory-grid">
            {cars.map((listing, index) => (
              <Reveal key={listing.id} delay={(index % 4) * 70}>
                <CarCard
                  car={toCard(listing)}
                  favorite={isFavorite(listing.id)}
                  onToggleFavorite={() => toggleFavorite(listing.id)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<IconHeart />}
            title="Your wishlist is empty"
            text="Browse the inventory and tap the heart on any car to save it here."
            to="/inventory"
            action="Browse Inventory"
          />
        )}
      </Content>
    </Section>
  );
}

import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CarCard from '../components/CarCard';
import EmptyState from '../components/EmptyState';
import ProfileCard from '../components/ProfileCard';
import Reveal from '../components/Reveal';
import { Content, Section } from '../components/Section';
import { IconCar, IconClock, IconHeart } from '../components/Icons';
import { useStore } from '../context/StoreContext';
import { toCard } from '../lib/listings';

function StatCard({ icon, value, label }) {
  return (
    <div className="stat-card">
      <span className="stat-card__icon" aria-hidden="true">{icon}</span>
      <span className="stat-card__texts">
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__label">{label}</span>
      </span>
    </div>
  );
}

function DashSection({ title, to, action, children }) {
  return (
    <section className="dash-section">
      <div className="dash-section__head">
        <h2>{title}</h2>
        {to && (
          <Link className="text-link" to={to}>
            {action} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export default function BuyerDashboard() {
  const { user, listings, favoriteIds, recentIds, isFavorite, toggleFavorite } = useStore();
  const firstName = user.fullName.split(' ')[0];

  const available = listings.filter((listing) => listing.status === 'available');
  const favorites = favoriteIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);
  const recent = recentIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);
  const suggestions = available.slice(0, 4);

  return (
    <Section className="dash">
      <Content>
        <Reveal className="dash-head">
          <div className="dash-head__text">
            <span className="tag">Buyer Dashboard</span>
            <h1>Welcome back, {firstName}.</h1>
            <p>
              Your wishlist, recently viewed cars, and the latest arrivals — all in one place.
            </p>
          </div>
          <div className="dash-head__actions">
            <Button to="/inventory" variant="dark">Browse Inventory</Button>
          </div>
        </Reveal>

        <Reveal className="dash-stats" delay={80}>
          <StatCard icon={<IconCar />} value={available.length} label="Cars available" />
          <StatCard icon={<IconHeart />} value={favorites.length} label="Saved favorites" />
          <StatCard icon={<IconClock />} value={recent.length} label="Recently viewed" />
        </Reveal>

        <div className="dash-layout">
          <div className="dash-main">
            <Reveal delay={120}>
              <DashSection title="Your favorites" to="/favorites" action="View all">
                {favorites.length ? (
                  <div className="dash-grid">
                    {favorites.slice(0, 2).map((listing) => (
                      <CarCard
                        key={listing.id}
                        car={toCard(listing)}
                        favorite={isFavorite(listing.id)}
                        onToggleFavorite={() => toggleFavorite(listing.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<IconHeart />}
                    title="No favorites yet"
                    text="Tap the heart on any car to start your wishlist."
                    to="/inventory"
                    action="Find a car"
                  />
                )}
              </DashSection>
            </Reveal>

            <Reveal delay={160}>
              <DashSection title="Recently viewed" to="/inventory" action="Keep browsing">
                {recent.length ? (
                  <div className="dash-grid">
                    {recent.slice(0, 2).map((listing) => (
                      <CarCard
                        key={listing.id}
                        car={toCard(listing)}
                        favorite={isFavorite(listing.id)}
                        onToggleFavorite={() => toggleFavorite(listing.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<IconClock />}
                    title="Nothing viewed yet"
                    text="Open a car to see its full spec — it will show up here next time."
                    to="/inventory"
                    action="Explore inventory"
                  />
                )}
              </DashSection>
            </Reveal>

            <Reveal delay={200}>
              <DashSection title="Available now" to="/inventory" action="View all">
                <div className="dash-grid">
                  {suggestions.map((listing) => (
                    <CarCard
                      key={listing.id}
                      car={toCard(listing)}
                      favorite={isFavorite(listing.id)}
                      onToggleFavorite={() => toggleFavorite(listing.id)}
                    />
                  ))}
                </div>
              </DashSection>
            </Reveal>
          </div>

          <aside className="dash-side">
            <Reveal delay={140}>
              <ProfileCard user={user} />
              <div className="panel panel--links">
                <h2>Quick links</h2>
                <Link to="/favorites">Your favorites</Link>
                <Link to="/inventory">Browse inventory</Link>
                <Link to="/profile">My profile</Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </Content>
    </Section>
  );
}

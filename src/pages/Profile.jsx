import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProfileCard from '../components/ProfileCard';
import Reveal from '../components/Reveal';
import { Content, Section } from '../components/Section';
import { IconCar, IconClock, IconHeart, IconTag } from '../components/Icons';
import { useStore } from '../context/StoreContext';
import { formatDate } from '../lib/storage';

function Row({ label, value }) {
  return (
    <div className="detail-row">
      <span className="detail-row__label">{label}</span>
      <span className="detail-row__value">{value}</span>
    </div>
  );
}

export default function Profile() {
  const { user, favoriteIds, recentIds, myListings } = useStore();
  const isBuyer = user.role === 'buyer';

  const stats = isBuyer
    ? [
        { icon: <IconHeart />, value: favoriteIds.length, label: 'Saved favorites' },
        { icon: <IconClock />, value: recentIds.length, label: 'Recently viewed' },
        { icon: <IconCar />, value: 'Buyer', label: 'Account type' },
      ]
    : [
        { icon: <IconCar />, value: myListings.length, label: 'Total listings' },
        {
          icon: <IconTag />,
          value: myListings.filter((listing) => listing.status === 'available').length,
          label: 'Available',
        },
        {
          icon: <IconTag />,
          value: myListings.filter((listing) => listing.status === 'sold').length,
          label: 'Sold',
        },
      ];

  return (
    <Section className="dash">
      <Content>
        <Reveal className="dash-head">
          <div className="dash-head__text">
            <span className="tag">{isBuyer ? 'Buyer account' : 'Seller account'}</span>
            <h1>My profile.</h1>
            <p>Your account details and the shortcuts that matter for your role.</p>
          </div>
          <div className="dash-head__actions">
            <Button to={isBuyer ? '/dashboard' : '/seller'} variant="dark">
              My Dashboard
            </Button>
          </div>
        </Reveal>

        <Reveal className="dash-stats" delay={80}>
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span className="stat-card__icon" aria-hidden="true">{stat.icon}</span>
              <span className="stat-card__texts">
                <span className="stat-card__value">{stat.value}</span>
                <span className="stat-card__label">{stat.label}</span>
              </span>
            </div>
          ))}
        </Reveal>

        <div className="dash-layout">
          <div className="dash-main">
            <Reveal delay={120}>
              <div className="panel">
                <h2>Account details</h2>
                <div className="detail-list">
                  <Row label="Full name" value={user.fullName} />
                  <Row label="Email" value={user.email} />
                  <Row label="Role" value={isBuyer ? 'Buyer' : 'Seller'} />
                  <Row label="Member since" value={formatDate(user.createdAt)} />
                  <Row label="Session" value="Stored in this browser" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="panel">
                <h2>Shortcuts</h2>
                <div className="quick-links">
                  {isBuyer ? (
                    <>
                      <Link to="/dashboard">Buyer dashboard</Link>
                      <Link to="/favorites">My favorites</Link>
                      <Link to="/inventory">Browse inventory</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/seller">Seller dashboard</Link>
                      <Link to="/seller/listings">My listings</Link>
                      <Link to="/seller/add-car">Add a new car</Link>
                    </>
                  )}
                </div>
                <p className="panel__note">
                  This is a front-end demo. Accounts and sessions live in localStorage and are not
                  protected by server-side authentication.
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="dash-side">
            <Reveal delay={140}>
              <ProfileCard user={user} />
            </Reveal>
          </aside>
        </div>
      </Content>
    </Section>
  );
}

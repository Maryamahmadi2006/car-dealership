import { formatDate } from '../lib/storage';

const initialsOf = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <span className="avatar" aria-hidden="true">{initialsOf(user.fullName)}</span>
      <div className="profile-card__texts">
        <span className="profile-card__name">{user.fullName}</span>
        <span className="profile-card__email">{user.email}</span>
      </div>
      <span className={`role-pill is-${user.role}`}>
        {user.role === 'buyer' ? 'Buyer account' : 'Seller account'}
      </span>
      <dl className="profile-card__meta">
        <div>
          <dt>Member since</dt>
          <dd>{formatDate(user.createdAt)}</dd>
        </div>
        <div>
          <dt>Session</dt>
          <dd>Stored in this browser</dd>
        </div>
      </dl>
    </div>
  );
}

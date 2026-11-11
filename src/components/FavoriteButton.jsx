import { IconHeart } from './Icons';

export default function FavoriteButton({ active, onToggle, label }) {
  return (
    <button
      type="button"
      className={`fav-btn${active ? ' is-active' : ''}`}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? `Remove ${label} from favorites` : `Save ${label} to favorites`}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <IconHeart filled={active} />
    </button>
  );
}

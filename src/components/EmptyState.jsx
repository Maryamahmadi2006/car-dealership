import Button from './Button';

export default function EmptyState({ icon, title, text, to, action }) {
  return (
    <div className="dash-empty">
      {icon && <span className="dash-empty__icon" aria-hidden="true">{icon}</span>}
      <h3>{title}</h3>
      <p>{text}</p>
      {to && action && <Button to={to} variant="dark">{action}</Button>}
    </div>
  );
}

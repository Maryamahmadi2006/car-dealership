import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

/**
 * Pill button with diagonal shine sweep + square arrow box.
 * variant: 'dark' | 'light'
 * Use `to` for internal react-router links, `href` for external/anchor links.
 */
export default function Button({ href, to, variant = 'dark', children, className = '', onClick, ...rest }) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      <span className="btn__shine" aria-hidden="true" />
      <span className="btn__label">{children}</span>
      <span className="btn__arrow" aria-hidden="true">
        <ArrowRight />
      </span>
    </>
  );

  if (to) {
    return (
      <Link className={cls} to={to} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a className={cls} href={href ?? '#'} onClick={onClick} {...rest}>
      {content}
    </a>
  );
}

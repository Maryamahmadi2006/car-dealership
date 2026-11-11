import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import PasswordField from '../components/PasswordField';
import { IconUser, IconTag } from '../components/Icons';
import { useStore } from '../context/StoreContext';
import { EMAIL_RE } from '../lib/storage';

const ROLES = [
  {
    id: 'buyer',
    title: 'Buyer',
    hint: 'Browse, save favorites and contact sellers.',
    Icon: IconUser,
  },
  {
    id: 'seller',
    title: 'Seller',
    hint: 'Publish and manage your own listings.',
    Icon: IconTag,
  },
];

export default function Register() {
  const { user, register } = useStore();
  const navigate = useNavigate();
  const timer = useRef(null);
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [role, setRole] = useState('buyer');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (user) {
    return <Navigate to={user.role === 'seller' ? '/seller' : '/dashboard'} replace />;
  }

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter your full name.';
    }
    if (!EMAIL_RE.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (values.password.length < 6) {
      nextErrors.password = 'Use at least 6 characters.';
    }
    if (values.confirm !== values.password) {
      nextErrors.confirm = 'Passwords do not match.';
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus({ type: 'error', text: 'Please check the highlighted fields.' });
      return;
    }

    setPending(true);
    setStatus(null);
    const result = await register({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      role,
    });

    if (!result.ok) {
      setPending(false);
      if (result.field) setErrors({ [result.field]: result.error });
      setStatus({ type: 'error', text: result.error });
      return;
    }

    setStatus({
      type: 'success',
      text: `Account created as a ${role}. Taking you to your dashboard…`,
    });
    timer.current = setTimeout(() => {
      navigate(role === 'seller' ? '/seller' : '/dashboard', { replace: true });
    }, 700);
  };

  return (
    <AuthLayout
      tag="Create account"
      title="Join the showroom."
      text="Choose how you want to use CAR DEALERSHIP — buy the car you want or sell your own."
      image={`${import.meta.env.BASE_URL}images/car-emblora-wyndcroft.webp`}
      imageAlt="Matte black performance SUV in a studio"
      headline="Two roles. One showroom."
      blurb="Buyers curate a wishlist. Sellers publish listings. Both get a dashboard tailored to the way they drive."
      footer={
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-form__grid">
          <div className="field is-full">
            <label className="field__label" htmlFor="reg-name">Full name</label>
            <input
              id="reg-name"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={setField('fullName')}
              placeholder="Jane Doe"
              autoComplete="name"
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={errors.fullName ? 'reg-name-error' : undefined}
              required
            />
            {errors.fullName && (
              <span className="field__error" id="reg-name-error">{errors.fullName}</span>
            )}
          </div>

          <div className="field is-full">
            <label className="field__label" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              value={values.email}
              onChange={setField('email')}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'reg-email-error' : undefined}
              required
            />
            {errors.email && (
              <span className="field__error" id="reg-email-error">{errors.email}</span>
            )}
          </div>

          <PasswordField
            id="reg-password"
            label="Password"
            value={values.password}
            onChange={setField('password')}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            error={errors.password}
          />

          <PasswordField
            id="reg-confirm"
            label="Confirm password"
            value={values.confirm}
            onChange={setField('confirm')}
            placeholder="Repeat your password"
            autoComplete="new-password"
            error={errors.confirm}
          />
        </div>

        <div className="field field--roles">
          <span className="field__label">Account role</span>
          <div className="role-cards" role="radiogroup" aria-label="Account role">
            {ROLES.map(({ id, title, hint, Icon }) => (
              <label className={`role-card${role === id ? ' is-active' : ''}`} key={id}>
                <input
                  type="radio"
                  name="role"
                  value={id}
                  checked={role === id}
                  onChange={() => setRole(id)}
                />
                <span className="role-card__icon" aria-hidden="true"><Icon /></span>
                <span className="role-card__texts">
                  <span className="role-card__title">{title}</span>
                  <span className="role-card__hint">{hint}</span>
                </span>
                <span className="role-card__check" aria-hidden="true" />
              </label>
            ))}
          </div>
        </div>

        {status && (
          <p className={`form-msg form-msg--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
            {status.text}
          </p>
        )}

        <button className="lead-form__submit" type="submit" disabled={pending}>
          {pending ? 'Creating account…' : 'Create account'}
        </button>

        <p className="auth-note">
          Demo preview: this account is stored locally in your browser, not on a server.
        </p>
      </form>
    </AuthLayout>
  );
}

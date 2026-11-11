import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import PasswordField from '../components/PasswordField';
import { useStore } from '../context/StoreContext';
import { EMAIL_RE } from '../lib/storage';

export default function Login() {
  const { user, login } = useStore();
  const location = useLocation();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [pending, setPending] = useState(false);

  // Honor ?from delivered via router state so guests can resume the car they
  // tried to favorite after signing in.
  const from = location.state?.from;
  const target =
    from && from.startsWith('/') && from !== '/login'
      ? from
      : user?.role === 'seller'
        ? '/seller'
        : '/dashboard';

  if (user) {
    return <Navigate to={target} replace />;
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
    if (!EMAIL_RE.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!values.password) {
      nextErrors.password = 'Enter your password.';
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus({ type: 'error', text: 'Please check the highlighted fields.' });
      return;
    }

    setPending(true);
    setStatus(null);
    const result = await login(values);
    setPending(false);

    if (!result.ok) {
      setStatus({ type: 'error', text: result.error });
      return;
    }

    setStatus({ type: 'success', text: `Welcome back, ${result.user.fullName.split(' ')[0]}. Redirecting…` });
  };

  return (
    <AuthLayout
      tag="Account"
      title="Welcome back."
      text="Sign in to manage your wishlist, listings, and saved vehicles."
      image={`${import.meta.env.BASE_URL}images/hero-home.webp`}
      imageAlt="Luxury sports car on the road at dusk"
      headline="Your next drive is waiting."
      blurb="Sign in to unlock a tailored buying or selling experience built around the cars you love."
      footer={
        <p>
          New to CAR DEALERSHIP? <Link to="/register">Create an account</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field__label" htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={values.email}
            onChange={setField('email')}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            required
          />
          {errors.email && (
            <span className="field__error" id="login-email-error">{errors.email}</span>
          )}
        </div>

        <PasswordField
          id="login-password"
          label="Password"
          value={values.password}
          onChange={setField('password')}
          placeholder="Your password"
          autoComplete="current-password"
          error={errors.password}
        />

        {status && (
          <p className={`form-msg form-msg--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
            {status.text}
          </p>
        )}

        <button className="lead-form__submit" type="submit" disabled={pending}>
          {pending ? 'Signing in…' : 'Login'}
        </button>

        <p className="auth-note">
          Demo preview: accounts and sessions are stored only in this browser.
        </p>
      </form>
    </AuthLayout>
  );
}

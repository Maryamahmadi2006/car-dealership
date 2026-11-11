import { useState } from 'react';

function Field({ field, value, onChange }) {
  const id = `f-${field.name}`;
  const full = field.full || field.type === 'textarea' ? ' is-full' : '';

  return (
    <div className={`field${full}`}>
      <label className="field__label" htmlFor={id}>
        {field.label}
      </label>
      {field.type === 'select' ? (
        <div className="field__select">
          <select
            id={id}
            name={field.name}
            value={value}
            required={field.required}
            onChange={onChange}
          >
            <option value="" disabled>
              Select…
            </option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="field__chevron" aria-hidden="true" />
        </div>
      ) : field.type === 'textarea' ? (
        <textarea
          id={id}
          name={field.name}
          placeholder={field.placeholder}
          value={value}
          required={field.required}
          onChange={onChange}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          required={field.required}
          onChange={onChange}
        />
      )}
    </div>
  );
}

/**
 * Reusable lead form: renders configured fields, validates natively,
 * and swaps to a confirmation panel on submit (static demo — no backend).
 */
export default function LeadForm({ fields, submit, className = '' }) {
  const [values, setValues] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  if (sent) {
    return (
      <div className={`lead-form lead-form--sent ${className}`.trim()}>
        <span className="lead-form__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3>Thank you!</h3>
        <p>Your submission has been received. Our team will get back to you within hours.</p>
        <button
          className="btn btn--dark lead-form__again"
          type="button"
          onClick={() => {
            setValues({});
            setSent(false);
          }}
        >
          <span className="btn__shine" aria-hidden="true" />
          <span className="btn__label">Send another</span>
        </button>
      </div>
    );
  }

  return (
    <form
      className={`lead-form ${className}`.trim()}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="lead-form__grid">
        {fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name] || ''}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className="lead-form__submit" type="submit">
        {submit}
      </button>
    </form>
  );
}

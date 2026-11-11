import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { Content, Section } from '../components/Section';
import { IconPlus } from '../components/Icons';
import { useStore } from '../context/StoreContext';
import { vehicles } from '../data/vehicles';
import { compressImages } from '../lib/images';

const BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Estate', 'Hatchback', 'Truck'];
const CONDITIONS = ['New', 'As New', 'Excellent', 'Used'];
const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const TRANSMISSIONS = ['Automatic', 'Manual', 'Dual-Clutch', 'CVT'];
const MAX_PHOTOS = 6;

const LIBRARY = vehicles.map((vehicle) => ({
  src: vehicle.image,
  label: vehicle.name,
}));

const currentYear = new Date().getFullYear();

const emptyValues = {
  title: '',
  make: '',
  model: '',
  year: String(currentYear),
  mileage: '',
  price: '',
  type: 'Sedan',
  condition: 'Excellent',
  fuel: 'Petrol',
  transmission: 'Automatic',
  engine: '',
  hp: '',
  exterior: '',
  location: 'Bellevue, WA',
  description: '',
};

function toFormValues(listing) {
  if (!listing) return emptyValues;
  return {
    title: listing.title,
    make: listing.make,
    model: listing.model,
    year: String(listing.year),
    mileage: String(listing.mileage),
    price: String(listing.price),
    type: listing.type,
    condition: listing.condition,
    fuel: listing.fuel,
    transmission: listing.transmission,
    engine: listing.engine || '',
    hp: listing.hp || '',
    exterior: listing.exterior || '',
    location: listing.location,
    description: listing.description,
  };
}

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      {children}
      {error && <span className="field__error" id={`${id}-error`}>{error}</span>}
    </div>
  );
}

export default function CarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myListings, addListing, updateListing } = useStore();
  const editing = Boolean(id);
  const existing = editing ? myListings.find((listing) => listing.id === id) || null : null;

  const [values, setValues] = useState(() => toFormValues(existing));
  const [images, setImages] = useState(() =>
    existing ? [existing.image, ...(existing.gallery || [])].filter(Boolean) : []
  );
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  if (editing && !existing) {
    return <Navigate to="/seller/listings" replace />;
  }

  const setField = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  };

  const toggleLibraryImage = (src) => {
    if (images.includes(src)) {
      setImages(images.filter((image) => image !== src));
      return;
    }
    if (images.length >= MAX_PHOTOS) {
      setStatus({ type: 'error', text: `You can add up to ${MAX_PHOTOS} photos.` });
      return;
    }
    setImages([...images, src]);
    setErrors((current) => ({ ...current, images: undefined }));
  };

  const handleUpload = async (event) => {
    const { files } = event.target;
    if (!files || !files.length) return;
    const remaining = MAX_PHOTOS - images.length;
    if (remaining <= 0) {
      setStatus({ type: 'error', text: `You can add up to ${MAX_PHOTOS} photos.` });
      event.target.value = '';
      return;
    }
    setUploading(true);
    setStatus(null);
    try {
      const compressed = await compressImages(files, remaining);
      setImages((current) => [...current, ...compressed].slice(0, MAX_PHOTOS));
      setErrors((current) => ({ ...current, images: undefined }));
    } catch (error) {
      setStatus({ type: 'error', text: error.message });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const validate = () => {
    const next = {};
    if (values.title.trim().length < 4) next.title = 'Enter a listing title (4+ characters).';
    if (!values.make.trim()) next.make = 'Brand is required.';
    if (!values.model.trim()) next.model = 'Model is required.';
    const year = Number(values.year);
    if (!Number.isInteger(year) || year < 1900 || year > currentYear + 1) {
      next.year = `Enter a year between 1900 and ${currentYear + 1}.`;
    }
    if (values.mileage === '' || Number(values.mileage) < 0 || Number.isNaN(Number(values.mileage))) {
      next.mileage = 'Enter the mileage.';
    }
    if (!values.price || Number(values.price) <= 0) {
      next.price = 'Enter a price greater than 0.';
    }
    if (!values.location.trim()) next.location = 'Location is required.';
    if (values.description.trim().length < 20) {
      next.description = 'Add at least 20 characters describing the car.';
    }
    if (!images.length) next.images = 'Choose or upload at least one photo.';
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus({ type: 'error', text: 'Please fix the highlighted fields before saving.' });
      const firstInvalid = document.querySelector('.car-form [aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    setSaving(true);
    const payload = {
      ...values,
      image: images[0],
      gallery: images.slice(1),
    };
    const result = editing ? updateListing(existing.id, payload) : addListing(payload);
    setSaving(false);

    if (!result.ok) {
      setStatus({ type: 'error', text: result.error });
      return;
    }

    navigate('/seller/listings', {
      replace: true,
      state: {
        flash: editing
          ? 'Listing updated. The inventory reflects your changes.'
          : 'Listing published. It is now visible in the main inventory.',
      },
    });
  };

  return (
    <Section className="dash">
      <Content>
        <Reveal className="dash-head">
          <div className="dash-head__text">
            <span className="tag">Seller</span>
            <h1>{editing ? 'Edit listing.' : 'Add a new car.'}</h1>
            <p>
              {editing
                ? 'Update the details below — the inventory updates as soon as you save.'
                : 'Publish a car to the showroom inventory. The first photo becomes the main image.'}
            </p>
          </div>
          <div className="dash-head__actions">
            <Link className="text-link" to="/seller/listings">← Back to listings</Link>
          </div>
        </Reveal>

        <form className="car-form" onSubmit={handleSubmit} noValidate>
          <Reveal className="panel form-panel">
            <h2>Vehicle details</h2>
            <div className="lead-form__grid">
              <div className="field is-full">
                <label className="field__label" htmlFor="car-title">Listing title</label>
                <input
                  id="car-title"
                  type="text"
                  value={values.title}
                  onChange={setField('title')}
                  placeholder="2023 Aurvane Celeste Competition"
                  aria-invalid={errors.title ? true : undefined}
                  aria-describedby={errors.title ? 'car-title-error' : undefined}
                />
                {errors.title && <span className="field__error" id="car-title-error">{errors.title}</span>}
              </div>

              <Field id="car-make" label="Brand" error={errors.make}>
                <input
                  id="car-make"
                  type="text"
                  value={values.make}
                  onChange={setField('make')}
                  placeholder="Aurvane"
                  aria-invalid={errors.make ? true : undefined}
                />
              </Field>

              <Field id="car-model" label="Model" error={errors.model}>
                <input
                  id="car-model"
                  type="text"
                  value={values.model}
                  onChange={setField('model')}
                  placeholder="Celeste RP4"
                  aria-invalid={errors.model ? true : undefined}
                />
              </Field>

              <Field id="car-year" label="Year" error={errors.year}>
                <input
                  id="car-year"
                  type="number"
                  inputMode="numeric"
                  min="1900"
                  max={currentYear + 1}
                  value={values.year}
                  onChange={setField('year')}
                  placeholder="2023"
                  aria-invalid={errors.year ? true : undefined}
                />
              </Field>

              <Field id="car-mileage" label="Mileage (mi)" error={errors.mileage}>
                <input
                  id="car-mileage"
                  type="number"
                  min="0"
                  value={values.mileage}
                  onChange={setField('mileage')}
                  placeholder="12000"
                  aria-invalid={errors.mileage ? true : undefined}
                />
              </Field>

              <Field id="car-price" label="Price ($)" error={errors.price}>
                <input
                  id="car-price"
                  type="number"
                  min="0"
                  step="100"
                  value={values.price}
                  onChange={setField('price')}
                  placeholder="95000"
                  aria-invalid={errors.price ? true : undefined}
                />
              </Field>

              <Field id="car-location" label="Location" error={errors.location}>
                <input
                  id="car-location"
                  type="text"
                  value={values.location}
                  onChange={setField('location')}
                  placeholder="Bellevue, WA"
                  aria-invalid={errors.location ? true : undefined}
                />
              </Field>

              <Field id="car-type" label="Body type">
                <div className="field__select">
                  <select id="car-type" value={values.type} onChange={setField('type')}>
                    {BODY_TYPES.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="field__chevron" aria-hidden="true" />
                </div>
              </Field>

              <Field id="car-condition" label="Condition">
                <div className="field__select">
                  <select id="car-condition" value={values.condition} onChange={setField('condition')}>
                    {CONDITIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="field__chevron" aria-hidden="true" />
                </div>
              </Field>

              <Field id="car-fuel" label="Fuel type">
                <div className="field__select">
                  <select id="car-fuel" value={values.fuel} onChange={setField('fuel')}>
                    {FUELS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="field__chevron" aria-hidden="true" />
                </div>
              </Field>

              <Field id="car-transmission" label="Transmission">
                <div className="field__select">
                  <select
                    id="car-transmission"
                    value={values.transmission}
                    onChange={setField('transmission')}
                  >
                    {TRANSMISSIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="field__chevron" aria-hidden="true" />
                </div>
              </Field>

              <Field id="car-engine" label="Engine (optional)">
                <input
                  id="car-engine"
                  type="text"
                  value={values.engine}
                  onChange={setField('engine')}
                  placeholder="3.0L Twin-Turbo Inline-6"
                />
              </Field>

              <Field id="car-hp" label="Horsepower (optional)">
                <input
                  id="car-hp"
                  type="text"
                  value={values.hp}
                  onChange={setField('hp')}
                  placeholder="503 HP"
                />
              </Field>

              <div className="field is-full">
                <label className="field__label" htmlFor="car-exterior">Exterior colour (optional)</label>
                <input
                  id="car-exterior"
                  type="text"
                  value={values.exterior}
                  onChange={setField('exterior')}
                  placeholder="Isle of Man Green Metallic"
                />
              </div>

              <div className="field is-full">
                <label className="field__label" htmlFor="car-description">Description</label>
                <textarea
                  id="car-description"
                  value={values.description}
                  onChange={setField('description')}
                  placeholder="Tell buyers about the condition, service history and what makes this car special…"
                  aria-invalid={errors.description ? true : undefined}
                  aria-describedby={errors.description ? 'car-description-error' : undefined}
                />
                {errors.description && (
                  <span className="field__error" id="car-description-error">{errors.description}</span>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal className="panel form-panel" delay={100}>
            <div className="form-panel__head">
              <h2>Photos</h2>
              <span className="form-panel__hint">
                First photo is the main image · up to {MAX_PHOTOS}
              </span>
            </div>

            {images.length > 0 && (
              <div className="image-previews">
                {images.map((src, index) => (
                  <figure className={`image-thumb${index === 0 ? ' is-main' : ''}`} key={`${src.slice(0, 24)}-${index}`}>
                    <img src={src} alt="" />
                    {index === 0 && <span className="image-thumb__main">Main</span>}
                    <button
                      type="button"
                      className="image-thumb__remove"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      aria-label="Remove photo"
                    >
                      ×
                    </button>
                  </figure>
                ))}
              </div>
            )}

            <div className="upload-row">
              <label className={`upload-btn${uploading ? ' is-busy' : ''}`}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpload}
                  disabled={uploading || images.length >= MAX_PHOTOS}
                />
                <IconPlus />
                {uploading ? 'Optimising photos…' : 'Upload photos'}
              </label>
              <span className="upload-hint">
                JPG or PNG. Photos are resized in your browser to keep listings fast.
              </span>
            </div>

            <div className="library">
              <span className="field__label">Or choose a showroom photo</span>
              <div className="library__grid">
                {LIBRARY.map((item) => (
                  <button
                    type="button"
                    key={item.src}
                    className={`library-item${images.includes(item.src) ? ' is-selected' : ''}`}
                    onClick={() => toggleLibraryImage(item.src)}
                    aria-pressed={images.includes(item.src)}
                  >
                    <img src={item.src} alt={item.label} loading="lazy" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {errors.images && <span className="field__error">{errors.images}</span>}
          </Reveal>

          {status && (
            <p className={`form-msg form-msg--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
              {status.text}
            </p>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="lead-form__submit form-actions__submit"
              disabled={saving || uploading}
            >
              {uploading ? 'Optimising photos…' : saving ? 'Saving…' : editing ? 'Save changes' : 'Publish listing'}
            </button>
            <Link className="btn btn--pill" to="/seller/listings">Cancel</Link>
          </div>
        </form>
      </Content>
    </Section>
  );
}

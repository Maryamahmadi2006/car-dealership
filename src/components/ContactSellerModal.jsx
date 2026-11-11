import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { IconMail, IconMap, IconPhone } from './Icons';

export default function ContactSellerModal({ open, onClose, seller, vehicleName }) {
  const [message, setMessage] = useState('');
  const email = seller?.email || 'contact@car-dealership.co';
  const phone = seller?.phone || '+1 (425) 555-0142';
  const subject = `Inquiry about ${vehicleName}`;
  const body = message.trim() || `Hi, I would like more information about the ${vehicleName}.`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <Modal open={open} title="Contact Seller" onClose={onClose}>
      <div className="contact-seller">
        <div className="contact-seller__seller">
          <span className="avatar" aria-hidden="true">
            {String(seller?.name || 'CD')
              .split(' ')
              .filter(Boolean)
              .map((part) => part[0])
              .slice(0, 2)
              .join('')}
          </span>
          <div>
            <strong>{seller?.name || 'CAR DEALERSHIP'}</strong>
            <span>{vehicleName}</span>
          </div>
        </div>

        <ul className="contact-seller__details">
          <li><IconMail /> <a href={`mailto:${email}`}>{email}</a></li>
          {phone && <li><IconPhone /> <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a></li>}
          <li><IconMap /> <span>{seller?.location || 'Bellevue, WA'}</span></li>
        </ul>

        <div className="field contact-seller__message">
          <label className="field__label" htmlFor="seller-message">Message</label>
          <textarea
            id="seller-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={`Tell the seller what you would like to know about the ${vehicleName}…`}
          />
        </div>

        <div className="contact-seller__actions">
          <Button href={mailto} variant="dark">Send email</Button>
          <a className="btn btn--pill" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>Call seller</a>
        </div>
        <p className="auth-note">
          Opens your email or phone app. This demo site does not send messages itself.
        </p>
      </div>
    </Modal>
  );
}

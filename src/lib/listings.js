import { vehicles, getVehicle } from '../data/vehicles';
import { formatDate, formatNumber, formatPrice } from './storage';

export const SEED_SELLER = {
  id: 'dealership',
  name: 'CAR DEALERSHIP',
  email: 'contact@car-dealership.co',
  phone: '+1 (425) 555-0142',
  location: 'Bellevue, WA',
};

/** Showroom stock, normalized to the same shape as seller-created listings. */
export const seedListings = vehicles.map((vehicle, index) => ({
  ...vehicle,
  id: `seed-${vehicle.slug}`,
  sellerId: SEED_SELLER.id,
  seller: SEED_SELLER,
  status: 'available',
  seed: true,
  location: 'Bellevue, WA',
  createdAt: `2024-05-${String(index + 1).padStart(2, '0')}T09:00:00.000Z`,
}));

export const listingTitle = (listing) => (listing.seed ? listing.name : listing.title);
export const listingPrice = (listing) => formatPrice(listing.price);
export const listingAlt = (listing) =>
  listing.alt || `${listingTitle(listing)} — listing photo`;

export function toCard(listing) {
  return {
    slug: listing.slug,
    name: listingTitle(listing),
    price: listingPrice(listing),
    year: String(listing.year),
    image: listing.image,
    alt: listingAlt(listing),
    badge: listing.status === 'sold' ? 'Sold' : listing.badge || null,
  };
}

export const findListing = (listings, slug) =>
  listings.find((listing) => listing.slug === slug) || null;

/** Full detail payload consumed by Hero / Inventory specs. */
export function listingToVehicle(listing) {
  if (!listing) return null;

  if (listing.seed) {
    const base = getVehicle(listing.slug);
    return {
      ...base,
      id: listing.id,
      listingId: listing.id,
      slug: listing.slug,
      status: listing.status,
      seller: listing.seller,
      sellerId: listing.sellerId,
    };
  }

  const images = [listing.image, ...(listing.gallery || [])]
    .filter(Boolean)
    .filter((src, index, all) => all.indexOf(src) === index);

  const specRows = [
    { label: 'Mileage', value: formatNumber(listing.mileage) },
    { label: 'Transmission', value: listing.transmission },
    { label: 'Fuel Type', value: listing.fuel },
    { label: 'Body Type', value: listing.type },
    { label: 'Year', value: String(listing.year) },
  ];
  if (listing.engine) specRows.splice(2, 0, { label: 'Engine', value: listing.engine });
  if (listing.hp) specRows.push({ label: 'Horse Power', value: listing.hp });
  if (listing.exterior) specRows.push({ label: 'Exterior Color', value: listing.exterior });

  const historyRows = [
    { label: 'Condition', value: listing.condition },
    { label: 'Location', value: listing.location },
    { label: 'Seller', value: listing.seller?.name || 'Private seller' },
    { label: 'Listed', value: formatDate(listing.createdAt) },
  ];

  const accordions = [
    { title: 'Specifications', kind: 'rows', items: specRows },
    { title: 'Condition & History', kind: 'rows', items: historyRows },
  ];

  return {
    id: listing.id,
    listingId: listing.id,
    slug: listing.slug,
    name: listing.title,
    category: listing.type,
    description: listing.description,
    price: listingPrice(listing),
    stock: `LST-${listing.id.slice(-6).toUpperCase()}`,
    vin: listing.vin || null,
    image: listing.image,
    imageAlt: listingAlt(listing),
    status: listing.status,
    seller: listing.seller,
    quickInfos: [
      { icon: 'price', value: '$', suffix: listingPrice(listing) },
      { icon: 'year', value: String(listing.year) },
      { icon: 'body', value: listing.type },
      { icon: 'fuel', value: listing.fuel },
      { icon: 'owners', value: String(listing.owners || 1) },
    ],
    gallery: images.map((src, index) => ({
      src,
      alt: index === 0 ? listingAlt(listing) : `${listingTitle(listing)} photo ${index + 1}`,
    })),
    vehicleDetails: [
      { label: 'Price ( $ )', value: listingPrice(listing) },
      { label: 'Mileage', value: formatNumber(listing.mileage) },
      { label: 'Year', value: String(listing.year) },
      { label: 'Body Type', value: listing.type },
      { label: 'Make', value: listing.make },
      { label: 'Model', value: listing.model },
      { label: 'Fuel Type', value: listing.fuel },
      { label: 'Location', value: listing.location },
    ],
    accordions,
  };
}

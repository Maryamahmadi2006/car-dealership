import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import VehicleSpecs from '../components/Inventory';
import CtaSection from '../components/CtaSection';
import FeaturedCars from '../components/FeaturedCars';
import SellerPanel from '../components/SellerPanel';
import ContactSellerModal from '../components/ContactSellerModal';
import { useStore } from '../context/StoreContext';
import { findListing, listingToVehicle } from '../lib/listings';

export default function VehicleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, listings, isFavorite, toggleFavorite, recordView } = useStore();
  const listing = findListing(listings, slug);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (listing && user?.role === 'buyer') recordView(listing.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing?.id, user?.id]);

  if (!listing) return <Navigate to="/inventory" replace />;

  const vehicle = listingToVehicle(listing);
  const canFavorite = user?.role !== 'seller';
  const favorite = isFavorite(listing.id);

  const goToLogin = () =>
    navigate('/login', { state: { from: location.pathname }, replace: false });

  const handleFavorite = () => {
    if (!user) {
      goToLogin();
      return;
    }
    if (user.role !== 'buyer') return;
    toggleFavorite(listing.id);
  };

  const handleContact = () => {
    if (!user) {
      goToLogin();
      return;
    }
    setContactOpen(true);
  };

  return (
    <>
      <Hero
        vehicle={vehicle}
        favorite={favorite}
        onToggleFavorite={canFavorite ? handleFavorite : undefined}
        onContact={handleContact}
      />
      <VehicleSpecs vehicle={vehicle} />
      <SellerPanel
        seller={listing.seller}
        price={vehicle.price}
        status={vehicle.status}
        onContact={handleContact}
      />
      <CtaSection />
      <FeaturedCars />
      <ContactSellerModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        seller={listing.seller}
        vehicleName={vehicle.name}
      />
    </>
  );
}

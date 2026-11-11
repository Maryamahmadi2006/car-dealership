import { Navigate, useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import VehicleSpecs from '../components/Inventory';
import CtaSection from '../components/CtaSection';
import FeaturedCars from '../components/FeaturedCars';
import { getCar, getVehicle } from '../data/vehicles';

export default function VehicleDetail() {
  const { slug } = useParams();

  if (!getCar(slug)) return <Navigate to="/inventory" replace />;

  const vehicle = getVehicle(slug);

  return (
    <>
      <Hero vehicle={vehicle} />
      <VehicleSpecs vehicle={vehicle} />
      <CtaSection />
      <FeaturedCars />
    </>
  );
}

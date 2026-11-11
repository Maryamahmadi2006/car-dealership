import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import InventoryPage from './pages/InventoryPage';
import VehicleDetail from './pages/VehicleDetail';
import TradeIn from './pages/TradeIn';
import Financing from './pages/Financing';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyerDashboard from './pages/BuyerDashboard';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import SellerDashboard from './pages/SellerDashboard';
import SellerListings from './pages/SellerListings';
import CarForm from './pages/CarForm';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:slug" element={<VehicleDetail />} />
        <Route path="/trade-in" element={<TradeIn />} />
        <Route path="/financing" element={<Financing />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth role="buyer">
              <BuyerDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/favorites"
          element={
            <RequireAuth role="buyer">
              <Favorites />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="/seller"
          element={
            <RequireAuth role="seller">
              <SellerDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/seller/listings"
          element={
            <RequireAuth role="seller">
              <SellerListings />
            </RequireAuth>
          }
        />
        <Route
          path="/seller/add-car"
          element={
            <RequireAuth role="seller">
              <CarForm />
            </RequireAuth>
          }
        />
        <Route
          path="/seller/edit/:id"
          element={
            <RequireAuth role="seller">
              <CarForm />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

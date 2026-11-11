import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import InventoryPage from './pages/InventoryPage';
import VehicleDetail from './pages/VehicleDetail';
import TradeIn from './pages/TradeIn';
import Financing from './pages/Financing';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

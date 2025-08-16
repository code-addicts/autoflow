import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VehicleList from './pages/VehicleList';
import AddVehiclePage from './pages/AddVehiclePage';
import EditVehiclePage from './pages/EditVehiclePage';

export default function App() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/add" element={<AddVehiclePage />} />
          <Route path="/edit/:id" element={<EditVehiclePage />} />
        </Routes>
      </main>
    </div>
  );
}
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; // 1. Import ProtectedRoute
import VehicleList from './pages/VehicleList';
import AddVehiclePage from './pages/AddVehiclePage';
import EditVehiclePage from './pages/EditVehiclePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

export default function App() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />
      <main>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* --- Protected Routes --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<VehicleList />} />
            <Route path="/add" element={<AddVehiclePage />} />
            <Route path="/edit/:id" element={<EditVehiclePage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-red-500 p-4 text-white flex justify-between shadow-md">
      <h1 className="text-lg font-bold">AutoFlow</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Vehicles</Link>
        <Link to="/add" className="hover:underline">Add Vehicle</Link>
      </div>
    </nav>
  );
}

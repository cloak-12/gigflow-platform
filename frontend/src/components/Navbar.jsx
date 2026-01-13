import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">GigFlow</h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Gigs</Link>
        <Link to="/post" className="hover:underline">Post Job</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
}

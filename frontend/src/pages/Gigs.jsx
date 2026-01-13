import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get(`/api/gigs?search=${search}`).then(res => setGigs(res.data));
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">

        {/* Hero Header */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-extrabold">Find Your Next Gig 🚀</h2>
          <p className="text-gray-600">
            Browse freelance jobs posted by clients and start earning today
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            className="border rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search jobs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Gig Cards */}
        {gigs.length === 0 && (
          <p className="text-center text-gray-500">No gigs found.</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {gigs.map((g) => (
            <div
              key={g._id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-1">{g.title}</h3>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {g.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  ₹{g.budget}
                </span>

                <Link
                  to={`/dashboard/${g._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Bids →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

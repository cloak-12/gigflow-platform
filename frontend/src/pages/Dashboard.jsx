import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const { gigId } = useParams();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/bids/${gigId}`)
      .then(res => setBids(res.data))
      .finally(() => setLoading(false));
  }, [gigId]);

  const hire = async (bidId) => {
    await api.patch(`/api/bids/${bidId}/hire`);
    alert("🎉 Freelancer hired successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4 space-y-6">

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-center">Applicants</h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading bids...</p>
        )}

        {/* No bids */}
        {!loading && bids.length === 0 && (
          <p className="text-center text-gray-500">
            No freelancers have applied yet.
          </p>
        )}

        {/* Bid Cards */}
        <div className="space-y-4">
          {bids.map((b) => (
            <div
              key={b._id}
              className="bg-white p-5 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-lg">{b.freelancerId.name}</p>
                <p className="text-gray-600">Bid Amount: ₹{b.price}</p>
              </div>

              <button
                onClick={() => hire(b._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
              >
                Hire
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

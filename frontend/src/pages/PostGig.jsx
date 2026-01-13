import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function PostGig() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/gigs", form);
    navigate("/");
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Post New Job</h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="border p-2 w-full rounded"
        placeholder="Description"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Budget"
        onChange={e => setForm({ ...form, budget: e.target.value })}
      />

      <button className="bg-gray-900 hover:bg-black text-white p-2 w-full rounded">
        Post Job
      </button>
    </form>
  </div>
);

}

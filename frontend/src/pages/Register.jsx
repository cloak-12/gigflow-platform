import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/auth/register", form);
    navigate("/login");
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full rounded"
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="border p-2 w-full rounded"
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button className="bg-gray-900 hover:bg-black text-white p-2 w-full rounded">
        Register
      </button>
    </form>
  </div>
);

}

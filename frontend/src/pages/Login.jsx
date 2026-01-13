import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/auth/login", { email, password });
    navigate("/");
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={submit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        className="border p-2 w-full rounded"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full rounded"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button className="bg-gray-900 hover:bg-black text-white p-2 w-full rounded">
        Login
      </button>
    </form>
  </div>
);
}

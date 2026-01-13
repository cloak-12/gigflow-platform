import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import PostGig from "./pages/PostGig";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<PostGig />} />
        <Route path="/dashboard/:gigId" element={<Dashboard />} />
      </Routes>
    </>
  );
}

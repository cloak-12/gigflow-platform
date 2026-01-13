# GigFlow – Mini Freelance Marketplace Platform

GigFlow is a full stack mini freelance marketplace where clients can post jobs (gigs) and freelancers can apply by submitting bids. Clients can review bids and hire one freelancer, after which the gig gets assigned and other bids are rejected automatically.

## 🚀 Live Demo
Frontend: https://gigflow-platform.vercel.app  
Backend API: https://gigflow-platform-c066.onrender.com

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io (real-time notifications)

## ✅ Features

- User Registration and Login with JWT (HttpOnly Cookies)
- Users can act as both Client and Freelancer
- Post new Gigs with title, description and budget
- Browse and search gigs by title
- Freelancers can submit bids on gigs
- Clients can view all bids for their gig
- Atomic hiring logic:
  - Gig becomes assigned
  - Selected bid becomes hired
  - Other bids are rejected automatically
- Real-time notification to freelancer when hired (Socket.io)

## ⚙️ API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Gigs
- GET /api/gigs?search=
- POST /api/gigs

### Bids
- POST /api/bids
- GET /api/bids/:gigId

### Hiring
- PATCH /api/bids/:bidId/hire

## 🧪 How to Run Locally

### Backend

```bash
cd backend
npm install
npm run dev

import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthCallback from './pages/AuthCallback'
import MyTickets from './pages/MyTickets'
import UserDashboard from './pages/UserDashboard'
import UserBook from './pages/UserBook'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminUsers from './pages/AdminUsers'
import AdminBookings from './pages/AdminBookings'
import AdminPlaces from './pages/AdminPlaces'
// layout imports removed — Public site returns to root
import './App.css'

function App() {
  const location = useLocation()
  const hideDashboardChrome = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard')

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text">
      {!hideDashboardChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/auth-success" element={<AuthCallback />} />
        <Route path="/tickets" element={<MyTickets />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/book" element={<UserBook />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/places" element={<AdminPlaces />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideDashboardChrome && <Footer />}
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'

interface AdminBooking {
  id: string
  ticketCode: string
  travelerName: string
  travelers: number
  totalPrice: number
  status: string
  createdAt: string
  user: { name: string; email: string }
  destination: { name: string; country: string }
}

export default function AdminBookings() {
  const { user, isAuthenticated } = useAuthStore()
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') return
    apiClient.get('/admin/bookings')
      .then(({ data }) => setBookings(data.bookings ?? []))
      .catch(() => setError('Failed to load bookings.'))
      .finally(() => setIsLoading(false))
  }, [isAuthenticated, user?.role])

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <AdminLayout>
      <main className="px-4 py-8 lg:px-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Bookings & Tickets</h1>
          <p className="mt-1 text-primary-text-soft">All bookings across the platform.</p>
        </div>

        {isLoading && <p className="text-primary-text-soft">Loading bookings...</p>}
        {error && <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        {!isLoading && !error && bookings.length === 0 && (
          <div className="rounded-lg border border-primary-accent-cyan/20 bg-primary-bg-secondary p-8 text-center text-primary-text-soft">
            No bookings yet.
          </div>
        )}

        {!isLoading && !error && bookings.length > 0 && (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border border-primary-accent-cyan/20 bg-primary-bg-secondary p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{booking.destination.name}, {booking.destination.country}</p>
                    <p className="text-sm text-primary-text-soft">
                      {booking.user.name} - {booking.travelerName}
                    </p>
                    <p className="font-mono text-xs text-primary-accent-cyan">{booking.ticketCode}</p>
                    <p className="mt-1 text-xs text-primary-text-soft">
                      {booking.travelers} traveler(s) &middot; {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-accent-cyan">${booking.totalPrice}</p>
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                      booking.status === 'CONFIRMED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
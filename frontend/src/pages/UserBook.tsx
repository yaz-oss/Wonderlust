import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import BookingModal from '../components/BookingModal'
import DestinationGrid from '../components/cards/DestinationGrid'
import UserLayout from '../components/layout/UserLayout'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'
import type { Destination } from '../types'

export default function UserBook() {
  const { isAuthenticated, user } = useAuthStore()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [bookingDestination, setBookingDestination] = useState<Destination | null>(null)

  if (!isAuthenticated) return <Navigate to="/" replace />
  if (user?.role === 'ADMIN') return <Navigate to="/admin" replace />

  useEffect(() => {
    apiClient.get('/destinations', { params: { limit: 50 } })
      .then(({ data }) => setDestinations(data.destinations ?? []))
  }, [])

  return (
    <UserLayout>
      <main className="px-4 py-8 lg:px-10">
        <section>
          <h1 className="mb-1 text-3xl font-bold">Book Places</h1>
          <p className="mb-6 text-primary-text-soft">Browse destinations and book your next trip.</p>
          <DestinationGrid destinations={destinations} onBook={setBookingDestination} />
        </section>
      </main>

      {bookingDestination && (
        <BookingModal
          destination={bookingDestination}
          onClose={() => setBookingDestination(null)}
          onBooked={() => setBookingDestination(null)}
        />
      )}
    </UserLayout>
  )
}
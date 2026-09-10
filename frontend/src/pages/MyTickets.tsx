import { useEffect, useState } from 'react'
import TicketView from '../components/booking/TicketView'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'
import type { Booking } from '../types'

export default function MyTickets() {
  const { isAuthenticated } = useAuthStore()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) return

    setIsLoading(true)
    apiClient.get('/bookings/mine')
      .then(({ data }) => setBookings(data.bookings ?? []))
      .catch(() => setError('Could not load your tickets.'))
      .finally(() => setIsLoading(false))
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold">My Tickets</h1>
        <p className="mt-3 text-primary-text-soft">Sign in to see tickets after booking places.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <h1 className="text-4xl font-bold">My Tickets</h1>
      <p className="mt-3 text-primary-text-soft">Every confirmed booking creates a ticket here.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {isLoading && <p className="text-primary-text-soft">Loading tickets...</p>}
        {error && <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
        {!isLoading && !error && bookings.length === 0 && (
          <div className="rounded-lg border border-primary-accent-cyan/20 bg-primary-bg-secondary p-8 text-center text-primary-text-soft">
            No tickets yet. Book a place from Destinations.
          </div>
        )}
        {bookings.map((booking) => (
          <TicketView key={booking.id} booking={booking} />
        ))}
      </div>
    </main>
  )
}

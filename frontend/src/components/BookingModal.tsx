import { FormEvent, useState } from 'react'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'
import type { Booking, Destination } from '../types'

interface Props {
  destination: Destination
  onClose: () => void
  onBooked: (booking: Booking) => void
}

export default function BookingModal({ destination, onClose, onBooked }: Props) {
  const { isAuthenticated, user } = useAuthStore()
  const [travelerName, setTravelerName] = useState(user?.name || '')
  const [travelers, setTravelers] = useState(1)
  const [visitDate, setVisitDate] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!isAuthenticated) {
      setError('Please sign in before booking a ticket.')
      return
    }

    setIsSubmitting(true)
    try {
      const { data } = await apiClient.post('/bookings', {
        destinationId: destination.id,
        travelerName,
        travelers,
        visitDate
      })
      onBooked(data.booking)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Could not create this booking.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-700/35 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-lg border border-primary-accent-cyan/25 bg-primary-bg-secondary p-6 shadow-glow-cyan">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary-text">Book {destination.name}</h2>
            <p className="mt-1 text-sm text-primary-text-soft">
              Ticket price: $120 per traveler
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-primary-accent-cyan/30 px-3 py-1 text-primary-text-soft hover:text-primary-text"
          >
            X
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm text-primary-text-soft">Traveler name</span>
            <input
              required
              value={travelerName}
              onChange={(event) => setTravelerName(event.target.value)}
              className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-2 outline-none focus:border-primary-accent-cyan"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm text-primary-text-soft">Travelers</span>
              <input
                required
                min={1}
                type="number"
                value={travelers}
                onChange={(event) => setTravelers(Number(event.target.value))}
                className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-2 outline-none focus:border-primary-accent-cyan"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm text-primary-text-soft">Visit date</span>
              <input
                required
                type="date"
                value={visitDate}
                onChange={(event) => setVisitDate(event.target.value)}
                className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-2 outline-none focus:border-primary-accent-cyan"
              />
            </label>
          </div>

          <div className="rounded border border-primary-accent-cyan/20 bg-primary-bg p-4">
            <div className="flex justify-between text-sm text-primary-text-soft">
              <span>Total</span>
              <span className="font-semibold text-primary-text">${travelers * 120}</span>
            </div>
          </div>

          {error && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-primary-accent px-4 py-3 font-semibold text-primary-bg hover:bg-primary-accent-cyan disabled:opacity-60"
          >
            {isSubmitting ? 'Booking...' : 'Confirm booking'}
          </button>
        </form>
      </div>
    </div>
  )
}

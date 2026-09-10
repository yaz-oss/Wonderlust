import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import UserLayout from '../components/layout/UserLayout'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'
import type { Booking } from '../types'

export default function UserDashboard() {
  const { isAuthenticated, user } = useAuthStore()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState({ places: 0 })

  if (!isAuthenticated) return <Navigate to="/" replace />
  if (user?.role === 'ADMIN') return <Navigate to="/admin" replace />

  useEffect(() => {
    apiClient.get('/bookings/mine')
      .then(({ data }) => setBookings(data.bookings ?? []))
    apiClient.get('/destinations', { params: { limit: 50 } })
      .then(({ data }) => setStats({ places: data.destinations?.length ?? 0 }))
  }, [])

  return (
    <UserLayout>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-fuchsia-100 bg-gradient-to-br from-fuchsia-600 via-violet-600 to-slate-900 p-6 text-white shadow-2xl shadow-fuchsia-200/50 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-100">Traveler hub</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Welcome back, {user?.name || 'traveler'}.</h1>
              <p className="mt-3 max-w-2xl text-sm text-fuchsia-50/90 sm:text-base">
                Keep your bookings, travel plans, and upcoming adventures organized in one polished workspace.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-100">Account</p>
              <p className="mt-1 font-semibold">{user?.email}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ['Tickets', bookings.length],
            ['Places available', stats.places],
            ['Confirmed trips', bookings.filter((b) => b.status === 'CONFIRMED').length],
            ['Total travelers', bookings.reduce((t, b) => t + b.travelers, 0)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Recent bookings</h2>
                <p className="mt-1 text-sm text-slate-500">Your latest travel plans at a glance.</p>
              </div>
            </div>

            {bookings.length ? (
              <div className="mt-6 space-y-3">
                {bookings.slice(0, 4).map((booking) => (
                  <div key={booking.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{booking.destination?.name || 'Destination'}</p>
                      <p className="text-sm text-slate-500">{booking.visitDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600">
                        {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                No bookings yet. Start by exploring destinations and making your first reservation.
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">What to do next</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="rounded-2xl bg-fuchsia-50 px-4 py-3">Browse curated destinations and book your next getaway.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Track confirmed tickets and travel details from one place.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Keep every upcoming trip clearly organized and easy to review.</li>
              </ul>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Travel outlook</p>
              <p className="mt-3 text-2xl font-semibold">Your next trip is ready to book.</p>
            </div>
          </div>
        </section>
      </div>
    </UserLayout>
  )
}

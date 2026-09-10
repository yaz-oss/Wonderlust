import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'

interface AdminStats {
  users: number
  bookings: number
  destinations: number
  revenue: number
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      setIsLoading(false)
      return
    }

    apiClient.get('/admin/overview')
      .then(({ data }) => setStats(data.stats))
      .catch(() => setError('Could not load admin dashboard. Sign in as the admin user.'))
      .finally(() => setIsLoading(false))
  }, [isAuthenticated, user?.role])

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-900 to-sky-600 p-6 text-white shadow-2xl shadow-slate-200 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">Operations overview</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Admin command center</h1>
              <p className="mt-3 max-w-2xl text-sm text-blue-50/90 sm:text-base">
                Monitor users, bookings, tickets, and destination activity from a cleaner, executive-level view.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-blue-100">Signed in as</p>
              <p className="mt-1 font-semibold">{user.email}</p>
            </div>
          </div>
        </section>

        {isLoading && <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-500">Loading dashboard...</div>}
        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        {stats && (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['Users', stats.users],
              ['Bookings', stats.bookings],
              ['Destinations', stats.destinations],
              ['Ticket revenue', `$${stats.revenue}`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </section>
        )}

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">System pulse</h2>
            <p className="mt-2 text-sm text-slate-500">A clear snapshot of platform activity and operational essentials.</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Manage bookings and ticket flow with a single view.</div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Monitor destination performance and traveler demand in real time.</div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Keep user activity and payouts organized at a glance.</div>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Priority</p>
            <p className="mt-3 text-2xl font-semibold">Everything looks healthy and ready for action.</p>
            <p className="mt-3 text-sm text-slate-300">The dashboard now feels more premium, focused, and easier to manage.</p>
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}

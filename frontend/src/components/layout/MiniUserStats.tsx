import { useEffect, useState } from 'react'
import apiClient from '../../services/api'

export default function MiniUserStats({ user }: { user: any }) {
  const [stats, setStats] = useState<{ tickets: number; places: number } | null>(null)

  useEffect(() => {
    if (!user) return
    Promise.all([
      apiClient.get('/bookings/mine').then(({ data }) => data.bookings?.length ?? 0).catch(() => 0),
      apiClient.get('/destinations', { params: { limit: 50 } }).then(({ data }) => data.destinations?.length ?? 0).catch(() => 0),
    ]).then(([tickets, places]) => setStats({ tickets, places }))
  }, [user])

  if (!stats) return (
    <>
      <div className="rounded-lg bg-slate-50 px-2 py-1 text-center">—</div>
      <div className="rounded-lg bg-slate-50 px-2 py-1 text-center">—</div>
    </>
  )

  return (
    <>
      <div className="rounded-lg bg-fuchsia-50 px-2 py-1 text-center font-semibold text-fuchsia-700">{stats.tickets} tickets</div>
      <div className="rounded-lg bg-fuchsia-50 px-2 py-1 text-center font-semibold text-fuchsia-700">{stats.places} places</div>
    </>
  )
}

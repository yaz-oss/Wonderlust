import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  _count: { bookings: number }
}

export default function AdminUsers() {
  const { user, isAuthenticated } = useAuthStore()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') return
    apiClient.get('/admin/users')
      .then(({ data }) => setUsers(data.users ?? []))
      .catch(() => setError('Failed to load users.'))
      .finally(() => setIsLoading(false))
  }, [isAuthenticated, user?.role])

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <AdminLayout>
      <main className="px-4 py-8 lg:px-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="mt-1 text-primary-text-soft">All registered users and their activity.</p>
        </div>

        {isLoading && <p className="text-primary-text-soft">Loading users...</p>}
        {error && <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        {!isLoading && !error && (
          <div className="overflow-x-auto rounded-lg border border-primary-accent-cyan/20 bg-primary-bg-secondary">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-primary-accent-cyan/20 text-primary-text-soft">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Bookings</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-primary-accent-cyan/10 hover:bg-primary-bg">
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-primary-text-soft">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-primary-accent-cyan/10 px-2 py-0.5 text-xs font-medium text-primary-accent-cyan">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">{u._count.bookings}</td>
                    <td className="px-4 py-3 text-primary-text-soft">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </AdminLayout>
  )
}
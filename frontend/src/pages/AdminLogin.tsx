import { FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { isAuthenticated, user, setToken, setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated && user?.role === 'ADMIN') {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const { data } = await apiClient.post('/auth/login', { email, password })

      if (data.user?.role !== 'ADMIN') {
        setError('This account is not an admin account.')
        return
      }

      setUser(data.user)
      setToken(data.token)
      navigate('/admin', { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.error || 'Admin login failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-primary-bg px-4 py-10 text-primary-text">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-primary-accent-cyan/20 bg-primary-bg-secondary shadow-glow lg:grid-cols-[1fr_440px]">
          <section className="hidden bg-primary-bg p-10 lg:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-accent-cyan">Wonderlust system</p>
            <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight">
              Admin control center for bookings, tickets, and users.
            </h1>
            <div className="mt-10 grid gap-4">
              {['Users and roles', 'Bookings and tickets', 'Destination activity', 'Revenue overview'].map((item) => (
                <div key={item} className="rounded border border-primary-accent-cyan/15 bg-primary-bg-secondary p-4 text-primary-text-soft">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-8">
            <Link to="/" className="text-sm font-semibold text-primary-accent-cyan hover:text-primary-text">
              Back to website
            </Link>
            <h2 className="mt-8 text-3xl font-bold">Admin login</h2>
            <p className="mt-2 text-primary-text-soft">
              Admins sign in here and go directly to the system dashboard.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-1 block text-sm text-primary-text-soft">Admin email</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-3 outline-none focus:border-primary-accent-cyan"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm text-primary-text-soft">Password</span>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-3 outline-none focus:border-primary-accent-cyan"
                />
              </label>

              {error && (
                <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                disabled={isSubmitting}
                className="w-full rounded bg-primary-accent px-4 py-3 font-semibold text-primary-bg hover:bg-primary-accent-cyan disabled:opacity-60"
              >
                {isSubmitting ? 'Signing in...' : 'Enter admin system'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

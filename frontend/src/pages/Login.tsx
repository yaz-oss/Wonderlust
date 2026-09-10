import { FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'
import { useGoogleAuth } from '../hooks/useGoogleAuth'

export default function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, user, setToken, setUser } = useAuthStore()
  const { initiateGoogleLogin } = useGoogleAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const { data } = await apiClient.post('/auth/login', { email, password })
      setUser(data.user)
      setToken(data.token)
      navigate(data.user?.role === 'ADMIN' ? '/admin' : '/dashboard', { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.error || 'Could not sign you in right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true)
    try {
      initiateGoogleLogin()
    } catch (err) {
      setError('Failed to initiate Google login')
      setIsGoogleLoading(false)
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_30px_90px_rgba(72,18,113,0.24)] lg:grid-cols-[0.92fr_1fr]">
        <div className="relative min-h-[28rem] overflow-hidden bg-[#24135f] p-8 text-white sm:p-10">
          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/40 blur-2xl" />
          <div className="absolute -right-20 top-20 h-56 w-56 rounded-full bg-cyan-400/40 blur-2xl" />
          <div className="absolute bottom-10 left-10 h-20 w-20 rounded-full bg-fuchsia-500 shadow-[0_0_40px_rgba(236,72,153,0.65)]" />
          <div className="absolute right-10 top-10 h-28 w-28 rounded-full bg-cyan-400/80 shadow-[0_0_50px_rgba(34,211,238,0.45)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <Link to="/" className="flex items-center gap-3 text-sm font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/70">W</span>
              Wonderlust
            </Link>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-100">Welcome Back</p>
              <h1 className="mt-3 max-w-sm text-4xl font-bold leading-tight">Sign in and keep the journey moving.</h1>
              <p className="mt-4 max-w-sm leading-7 text-white/78">
                Pick up your tickets, plan the next stop, and return to the places that caught your eye.
              </p>
            </div>
            <p className="text-sm text-white/70">www.wonderlust.com</p>
          </div>
        </div>

        <div className="flex items-center px-6 py-10 sm:px-12">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-primary-text">Sign In</h2>
            <p className="mt-2 text-primary-text-soft">Welcome back to Wonderlust.</p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm text-primary-text-soft">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded border border-fuchsia-100 bg-fuchsia-50/50 px-3 py-3 text-primary-text outline-none focus:border-primary-accent focus:bg-white"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-primary-text-soft">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded border border-fuchsia-100 bg-fuchsia-50/50 px-3 py-3 text-primary-text outline-none focus:border-primary-accent focus:bg-white"
            />
          </label>

          {error && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow-[0_14px_30px_rgba(192,38,211,0.24)] hover:from-fuchsia-500 hover:to-cyan-400 disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-fuchsia-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-primary-text-soft">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded border border-fuchsia-200 bg-white px-4 py-3 font-semibold text-primary-text hover:bg-fuchsia-50 transition disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-primary-text-soft">
              New here? <Link to="/register" className="font-semibold text-primary-accent">Create an account</Link>
        </p>
          </div>
        </div>
      </section>
    </main>
  )
}

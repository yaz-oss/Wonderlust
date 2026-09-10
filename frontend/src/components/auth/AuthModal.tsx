import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../services/api'
import { useAuthStore } from '../../store/authStore'

interface Props {
  onClose: () => void
}

type Mode = 'login' | 'register'

export default function AuthModal({ onClose }: Props) {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setToken, setUser } = useAuthStore()

  const isRegistering = mode === 'register'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login'
      const payload = isRegistering
        ? { email, username, name, password }
        : { email, password }
      const { data } = await apiClient.post(endpoint, payload)

      setUser(data.user)
      setToken(data.token)
      onClose()
      navigate(data.user?.role === 'ADMIN' ? '/admin' : '/', { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.error || 'Could not sign you in right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-700/35 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-primary-accent-cyan/25 bg-primary-bg-secondary p-6 shadow-glow-cyan">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary-text">
              {isRegistering ? 'Create account' : 'Sign in'}
            </h2>
            <p className="mt-1 text-sm text-primary-text-soft">
              {isRegistering ? 'Start saving places and planning trips.' : 'Welcome back to Wonderlust.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-primary-accent-cyan/30 px-3 py-1 text-primary-text-soft hover:text-primary-text"
            aria-label="Close sign in"
          >
            X
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <label className="block">
                <span className="mb-1 block text-sm text-primary-text-soft">Name</span>
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-2 text-primary-text outline-none focus:border-primary-accent-cyan"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-primary-text-soft">Username</span>
                <input
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-2 text-primary-text outline-none focus:border-primary-accent-cyan"
                />
              </label>
            </>
          )}

          <label className="block">
            <span className="mb-1 block text-sm text-primary-text-soft">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-2 text-primary-text outline-none focus:border-primary-accent-cyan"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-primary-text-soft">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded border border-primary-accent-cyan/25 bg-primary-bg px-3 py-2 text-primary-text outline-none focus:border-primary-accent-cyan"
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
            className="w-full rounded bg-primary-accent px-4 py-3 font-semibold text-primary-bg hover:bg-primary-accent-cyan disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Working...' : isRegistering ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setError('')
            setMode(isRegistering ? 'login' : 'register')
          }}
          className="mt-5 w-full text-sm text-primary-accent-cyan hover:text-primary-text"
        >
          {isRegistering ? 'Already have an account? Sign in' : 'Need an account? Create one'}
        </button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import apiClient from '../services/api'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { setToken, setUser } = useAuthStore()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get('code')
        const token = searchParams.get('token')
        const userId = searchParams.get('userId')
        const errorParam = searchParams.get('error')

        if (errorParam) {
          setError('Authentication failed. Please try again.')
          setTimeout(() => navigate('/login'), 3000)
          return
        }

        // If we have token and userId from backend redirect
        if (token && userId) {
          // Fetch user details from the token
          try {
            const { data } = await apiClient.get('/auth/me', {
              headers: { Authorization: `Bearer ${token}` }
            })
            setUser(data.user)
            setToken(token)
            navigate(data.user?.role === 'ADMIN' ? '/admin' : '/dashboard', { replace: true })
          } catch {
            // If endpoint doesn't exist, just set the data we have
            setToken(token)
            navigate('/dashboard', { replace: true })
          }
          return
        }

        // If we have an authorization code, exchange it for a token
        if (code) {
          const redirectUri = import.meta.env.VITE_GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth-callback'
          const { data } = await apiClient.post('/auth/google-exchange-code', { code, redirectUri })
          setUser(data.user)
          setToken(data.token)
          navigate(data.user?.role === 'ADMIN' ? '/admin' : '/dashboard', { replace: true })
          return
        }

        setError('No authentication data received')
        setTimeout(() => navigate('/login'), 3000)
      } catch (err: any) {
        console.error('Auth callback error:', err)
        setError(err.response?.data?.error || 'Authentication failed')
        setTimeout(() => navigate('/login'), 3000)
      } finally {
        setIsLoading(false)
      }
    }

    handleOAuthCallback()
  }, [searchParams, navigate, setToken, setUser])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-accent border-t-transparent"></div>
          <p className="text-primary-text-soft">Processing your login...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-red-600">{error}</p>
          <p className="text-primary-text-soft">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return null
}

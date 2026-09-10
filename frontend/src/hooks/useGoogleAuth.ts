import { useAuthStore } from '../store/authStore'
import apiClient from '../services/api'

export const useGoogleAuth = () => {
  const { setToken, setUser } = useAuthStore()

  const handleGoogleSuccess = async (response: any) => {
    try {
      // Send the token to backend for verification
      const { data } = await apiClient.post('/auth/google-token-exchange', {
        token: response.credential || response.accessToken,
        idToken: response.credential
      })

      setUser(data.user)
      setToken(data.token)
      return { success: true, user: data.user }
    } catch (error: any) {
      console.error('Google auth error:', error)
      return {
        success: false,
        error: error.response?.data?.error || 'Google authentication failed'
      }
    }
  }

  const initiateGoogleLogin = () => {
    try {
      // Open Google OAuth URL in new window or redirect
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      const redirectUri = import.meta.env.VITE_GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth-callback'
      const scope = 'profile email'
      const responseType = 'code'

      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: responseType,
        scope: scope,
        access_type: 'offline'
      }).toString()}`

      // Open in same window or new window
      window.location.href = googleAuthUrl
    } catch (error) {
      console.error('Failed to initiate Google login:', error)
    }
  }

  return {
    handleGoogleSuccess,
    initiateGoogleLogin
  }
}

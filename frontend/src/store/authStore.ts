import { create } from 'zustand'

interface User {
  id: string
  email: string
  username: string
  name: string
  avatar?: string
  token?: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  setUser: (user) => set({ user }),
  
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token)
      set({ token, isAuthenticated: true })
    } else {
      localStorage.removeItem('token')
      set({ token: null, isAuthenticated: false })
    }
  },
  
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  }
}))

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-primary-accent' : 'text-primary-text-soft hover:text-primary-accent'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-fuchsia-100 bg-white/90 shadow-[0_10px_35px_rgba(72,18,113,0.08)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-primary-text">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-600 to-cyan-400 text-sm text-white shadow-[0_10px_25px_rgba(192,38,211,0.28)]">
            W
          </span>
          <span className="hidden sm:inline">Wonderlust</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-4">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/destinations" className={linkClass}>
            Destinations
          </NavLink>
          {isAuthenticated && (
            <>            
              <NavLink to="/tickets" className={linkClass}>
                Tickets
              </NavLink>
            </>
          )}
          {user?.role === 'ADMIN' && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="rounded border border-fuchsia-200 px-3 py-2 text-sm font-semibold text-primary-text-soft hover:bg-fuchsia-50 hover:text-primary-accent"
            >
              Sign out
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(192,38,211,0.2)] hover:from-fuchsia-500 hover:to-cyan-400 transition"
              >
                Sign In
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-fuchsia-100 bg-white shadow-lg">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-primary-text hover:bg-fuchsia-50 rounded-t-lg">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm text-primary-text hover:bg-fuchsia-50 rounded-b-lg border-t border-fuchsia-100">
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

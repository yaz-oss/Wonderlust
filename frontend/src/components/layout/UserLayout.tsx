import { ReactNode } from 'react'
import { Compass, Home, LayoutDashboard, LogOut, Ticket } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface Props {
  children: ReactNode
}

export default function UserLayout({ children }: Props) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/dashboard/book', label: 'Book', icon: Compass },
    { to: '/tickets', label: 'Tickets', icon: Ticket },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_32%),linear-gradient(135deg,_#fff_0%,_#fdf2f8_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-fuchsia-100/80 bg-slate-950/95 p-4 text-slate-100 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:border-white/10 lg:p-5">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl shadow-fuchsia-950/20 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-fuchsia-600 to-cyan-400 text-sm font-semibold text-white shadow-lg ring-4 ring-white/10">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-slate-950 bg-emerald-500"></span>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-fuchsia-300">User</p>
                <h2 className="text-sm font-semibold text-white">Traveler</h2>
                <p className="text-sm text-slate-400">Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 space-y-1.5">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/20'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 space-y-1.5 border-t border-white/10 pt-5">
            <Link to="/" className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              <Home size={18} />
              Public site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </aside>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}

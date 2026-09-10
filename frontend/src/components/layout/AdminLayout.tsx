import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
import {
  BookOpen,
  Home,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Users,
} from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const avatarZoom = 1.08
  const displayName = user?.name || user?.username || user?.email || 'Admin'

  useEffect(() => {
    const storedImage = localStorage.getItem('admin-avatar-preview')
    if (storedImage) setAvatarPreview(storedImage)
  }, [])

  useEffect(() => {
    if (avatarPreview) {
      localStorage.setItem('admin-avatar-preview', avatarPreview)
    }
  }, [avatarPreview])

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/places', label: 'Places', icon: MapPinned },
    { to: '/admin/bookings', label: 'Bookings', icon: BookOpen },
    { to: '/admin/users', label: 'Users', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#eff6ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">

        {/* Sidebar */}
        <aside className="w-full border-b border-slate-200/80 bg-white/90 p-5 backdrop-blur-xl lg:sticky lg:top-4 lg:mt-4 lg:h-[calc(100vh-2rem)] lg:w-72 lg:rounded-[28px] lg:border lg:border-slate-200/80 lg:shadow-xl lg:shadow-slate-200/70 lg:backdrop-blur-2xl">
          <div className="mb-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
                className="relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-white text-slate-400 shadow-sm transition hover:border-blue-400 hover:bg-blue-50"
              >
                {avatarPreview ? (
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="h-full w-full object-cover"
                      style={{ transform: `scale(${avatarZoom})` }}
                    />
                  </div>
                ) : (
                  <span className="text-2xl font-semibold">+</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">{displayName}</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          {/* Navigation */}
          <nav className="mt-2 space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-10 space-y-2 border-t border-slate-200 pt-6">

            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Home size={20} />
              Public Site
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              <LogOut size={20} />
              Sign Out
            </button>

          </div>

        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>

      </div>
    </div>
  )
}
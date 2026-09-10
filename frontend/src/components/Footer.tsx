import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-fuchsia-100 bg-[#21133e] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3 text-2xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-sm">W</span>
            <span>Wonderlust</span>
          </Link>
          <p className="mt-3 max-w-md leading-7 text-white/68">
            A public travel magazine for discovering memorable places, cultural notes, and trip ideas with a calm, light design.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Explore</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            <Link to="/destinations" className="hover:text-cyan-200">Destinations</Link>
            <Link to="/login" className="hover:text-cyan-200">Login</Link>
            <Link to="/register" className="hover:text-cyan-200">Register</Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Made For</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            <span>Weekend escapes</span>
            <span>Culture-first trips</span>
            <span>Nature and city breaks</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

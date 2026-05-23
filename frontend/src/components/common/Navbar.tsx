export default function Navbar() {
  return (
    <nav className="bg-primary-bg-secondary backdrop-blur-md border-b border-primary-accent-cyan/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-accent to-primary-accent-cyan bg-clip-text text-transparent">
              Wonderlust
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="hover:text-primary-accent transition">Home</a>
            <a href="/explore" className="hover:text-primary-accent transition">Explore</a>
            <button className="bg-primary-accent hover:bg-primary-accent-cyan text-primary-bg px-4 py-2 rounded-lg transition">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

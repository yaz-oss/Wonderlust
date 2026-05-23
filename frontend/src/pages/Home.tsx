export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-accent/10 to-primary-bg z-0"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-accent to-primary-accent-cyan bg-clip-text text-transparent">
            Discover Places Beyond Imagination
          </h1>
          <p className="text-xl text-primary-text-soft mb-8">
            AI-powered social travel discovery platform
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-primary-accent hover:bg-primary-accent-cyan text-primary-bg px-8 py-3 rounded-lg font-semibold transition">
              Explore Now
            </button>
            <button className="border-2 border-primary-accent-cyan text-primary-accent-cyan hover:bg-primary-accent-cyan/10 px-8 py-3 rounded-lg font-semibold transition">
              Plan Your Trip
            </button>
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Trending Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Destination cards will go here */}
        </div>
      </section>
    </div>
  )
}

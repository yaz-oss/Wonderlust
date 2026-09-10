import { useEffect, useMemo, useState } from 'react'
import DestinationGrid from '../components/cards/DestinationGrid'
import apiClient from '../services/api'
import type { Destination } from '../types'

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    apiClient.get('/destinations', { params: { limit: 50 } })
      .then(({ data }) => {
        if (isMounted) setDestinations(data.destinations ?? [])
      })
      .catch(() => {
        if (isMounted) setError('Could not load places. Make sure the backend is running on port 5000.')
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(destinations.map((destination) => destination.category)))]
  }, [destinations])

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase()

    let filtered = destinations.filter((destination) => {
      const matchesCategory = category === 'all' || destination.category === category
      const matchesSearch = !query || [
        destination.name,
        destination.city,
        destination.country,
        destination.description,
        destination.category,
      ].filter(Boolean).some((value) => value!.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })

    // Sort destinations
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'country') {
      filtered.sort((a, b) => a.country.localeCompare(b.country))
    }

    return filtered
  }, [category, destinations, search, sortBy])

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Enhanced Header Section */}
      <section className="bg-gradient-to-br from-[#1a0e2e] via-[#24135f] to-[#1a0e2e]">
        <div className="relative overflow-hidden">
          <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
          
          <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Explore Worldwide</p>
            <h1 className="mt-2 max-w-3xl text-5xl font-bold text-white sm:text-6xl">Discover All Destinations</h1>
            <p className="mt-4 max-w-2xl leading-7 text-white/80">
              Browse thousands of hand-picked places around the world. Search by city, country, or travel style to find your perfect destination.
            </p>

            {/* Search Bar */}
            <div className="mt-10 grid gap-3 md:grid-cols-[1fr_auto] lg:max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg transition group-focus-within:text-white">🔍</div>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search destinations, cities..."
                  className="w-full rounded-lg border-0 bg-white pl-12 pr-4 py-3 text-sm text-primary-text placeholder-primary-text-soft outline-none shadow-lg focus:ring-2 focus:ring-fuchsia-600 transition"
                />
              </div>
              <button className="rounded-lg bg-white/20 border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/30 transition backdrop-blur-sm">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="border-b border-fuchsia-100 bg-white sticky top-16 z-40 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-end">
            <div>
              <label className="text-sm font-semibold text-primary-text block mb-2">Category</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-fuchsia-200 bg-white px-4 py-2 text-primary-text outline-none focus:border-primary-accent focus:ring-2 focus:ring-fuchsia-200"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === 'all' ? '✨ All categories' : item.charAt(0).toUpperCase() + item.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-primary-text block mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-lg border border-fuchsia-200 bg-white px-4 py-2 text-primary-text outline-none focus:border-primary-accent focus:ring-2 focus:ring-fuchsia-200"
              >
                <option value="featured">Featured</option>
                <option value="name">Name (A-Z)</option>
                <option value="country">Country</option>
              </select>
            </div>

            <div className="text-sm text-primary-text-soft">
              {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-fuchsia-200 border-t-fuchsia-600" />
            <p className="mt-4 text-primary-text-soft">Loading amazing places...</p>
          </div>
        )}
        
        {error && (
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-6 text-red-700">
            <p className="font-semibold">Could not load destinations</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && filteredDestinations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-4xl mb-3">🌍</p>
            <p className="text-lg font-semibold text-primary-text">No destinations found</p>
            <p className="mt-2 text-primary-text-soft">Try adjusting your search or filters</p>
          </div>
        )}
        
        {!isLoading && !error && filteredDestinations.length > 0 && (
          <DestinationGrid destinations={filteredDestinations} />
        )}
      </section>
    </div>
  )
}

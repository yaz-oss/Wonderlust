import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import apiClient from '../services/api'
import { useAuthStore } from '../store/authStore'

interface AdminDestination {
  id: string
  name: string
  country: string
  city: string | null
  category: string
  rating: number
  _count: { bookings: number }
}

export default function AdminPlaces() {
  const { user, isAuthenticated } = useAuthStore()
  const [destinations, setDestinations] = useState<AdminDestination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const PAGE_SIZE = 20

  const loadDestinations = async (nextPage = 1, append = false, query = searchTerm, category = selectedCategory) => {
    if (!isAuthenticated || user?.role !== 'ADMIN') return

    if (append) {
      setIsLoadingMore(true)
    } else {
      setIsLoading(true)
      setError('')
    }

    try {
      const { data } = await apiClient.get('/admin/destinations', {
        params: {
          page: nextPage,
          limit: PAGE_SIZE,
          search: query.trim(),
          category: category || undefined,
        },
      })

      const incoming = data.destinations ?? []
      setDestinations((prev) => (append ? [...prev, ...incoming] : incoming))
      setPage(nextPage)
      setHasMore(Boolean(data.hasMore))
      setTotal(data.total ?? incoming.length)
    } catch {
      setError('Failed to load destinations.')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    loadDestinations(1, false, searchTerm, selectedCategory)
  }, [isAuthenticated, user?.role])

  const handleSearch = () => {
    loadDestinations(1, false, searchTerm, selectedCategory)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    loadDestinations(1, false, searchTerm, value)
  }

  const handleLoadMore = () => {
    if (!hasMore || isLoadingMore) return
    loadDestinations(page + 1, true, searchTerm, selectedCategory)
  }

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <AdminLayout>
      <main className="px-4 py-8 lg:px-10">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Places</h1>
            <p className="mt-1 text-primary-text-soft">Browse destinations in pages so large catalogs stay fast.</p>
          </div>
          {!isLoading && !error && (
            <div className="rounded-full border border-primary-accent-cyan/20 bg-primary-bg px-3 py-1.5 text-sm text-primary-text-soft">
              Showing {destinations.length} of {total} places
            </div>
          )}
        </div>

        {isLoading && <p className="text-primary-text-soft">Loading destinations...</p>}
        {error && <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        {!isLoading && !error && destinations.length === 0 && (
          <div className="rounded-lg border border-primary-accent-cyan/20 bg-primary-bg-secondary p-8 text-center text-primary-text-soft">
            No destinations yet.
          </div>
        )}

        {!isLoading && !error && (
          <div className="mb-4 flex flex-col gap-3 rounded-xl border border-primary-accent-cyan/20 bg-primary-bg-secondary p-4 md:flex-row md:items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleSearch()
                }
              }}
              placeholder="Search by name, country, city, or category"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-400"
            />
            <select
              value={selectedCategory}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-400"
            >
              <option value="">All categories</option>
              <option value="Beach">Beach</option>
              <option value="City">City</option>
              <option value="Coast">Coast</option>
              <option value="Heritage">Heritage</option>
              <option value="Island">Island</option>
              <option value="Mountain">Mountain</option>
            </select>
            <button
              type="button"
              onClick={handleSearch}
              className="rounded-lg bg-primary-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-accent/90"
            >
              Search
            </button>
          </div>
        )}

        {!isLoading && !error && destinations.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-lg border border-primary-accent-cyan/20 bg-primary-bg-secondary">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-primary-accent-cyan/20 text-primary-text-soft">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Country</th>
                    <th className="px-4 py-3 font-medium">City</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                    <th className="px-4 py-3 font-medium">Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((d) => (
                    <tr key={d.id} className="border-b border-primary-accent-cyan/10 hover:bg-primary-bg">
                      <td className="px-4 py-3 font-medium">{d.name}</td>
                      <td className="px-4 py-3 text-primary-text-soft">{d.country}</td>
                      <td className="px-4 py-3 text-primary-text-soft">{d.city || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-primary-accent/10 px-2 py-0.5 text-xs font-medium text-primary-accent">
                          {d.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">{d.rating.toFixed(1)}</td>
                      <td className="px-4 py-3">{d._count.bookings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-primary-text-soft">
                {hasMore ? `Showing ${destinations.length} of ${total} places. Load more to continue.` : `All ${total} places are loaded.`}
              </p>
              {hasMore && (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="rounded-full bg-primary-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoadingMore ? 'Loading...' : 'Load more'}
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </AdminLayout>
  )
}
import { useEffect, useState } from 'react'
import DestinationGrid from '../components/cards/DestinationGrid'
import apiClient from '../services/api'
import { getDestinationImage } from '../utils/destinationImages'
import type { Destination } from '../types'

const travelStyles = [
  ['Culture', 'Museums, markets, architecture, and neighborhood walks.'],
  ['Nature', 'Coastlines, mountain air, quiet lakes, and national parks.'],
  ['Food', 'Street food routes, local cafes, and regional specialties.'],
]

const planningNotes = [
  'Start with one anchor experience, then build the day around nearby streets and local food.',
  'Mix famous sights with slower neighborhoods so the trip feels personal, not rushed.',
  'Check weather, local holidays, and transport windows before locking in your route.',
]

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get('/destinations/trending')
      .then(({ data }) => {
        setDestinations(data.destinations ?? [])
        setLoading(false)
      })
      .catch(() => {
        setDestinations([])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0e2e] via-[#24135f] to-[#1a0e2e]">
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
            {/* Left Column */}
            <div className="text-white">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-300">
                ✨ Discover Your Next Adventure
              </p>
              <h1 className="max-w-2xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                Explore beautiful destinations worldwide
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                Browse hand-picked places, save inspiring ideas, and book your perfect trip with confidence.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="/destinations" className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-[0_20px_40px_rgba(192,38,211,0.3)] hover:from-fuchsia-500 hover:to-cyan-400 transition-all transform hover:scale-105">
                  <span className="relative z-10">Explore Destinations</span>
                </a>
                <a href="/register" className="rounded-lg border-2 border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10 transition backdrop-blur-sm">
                  Create Free Account
                </a>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-cyan-300">500+</p>
                  <p className="mt-1 text-sm text-white/70">Destinations</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-fuchsia-300">50k+</p>
                  <p className="mt-1 text-sm text-white/70">Happy Travelers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan-300">24/7</p>
                  <p className="mt-1 text-sm text-white/70">Support</p>
                </div>
              </div>
            </div>

            {/* Right Column - Featured Destinations */}
            <div className="grid gap-4">
              {!loading && destinations.length > 0 && (
                <>
                  <div className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/30 transition">
                    <div className="relative overflow-hidden h-96">
                      <img 
                        src={getDestinationImage(destinations[0])} 
                        alt={destinations[0].name} 
                        className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Featured</p>
                      <h2 className="mt-2 text-2xl font-bold text-white">{destinations[0].name}</h2>
                      <p className="mt-1 text-sm text-white/80">{destinations[0].country}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-3">
                    {destinations.slice(1, 4).map((destination) => (
                      <div key={destination.id} className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/30 transition">
                        <div className="relative overflow-hidden h-40">
                          <img 
                            src={getDestinationImage(destination)} 
                            alt={destination.name} 
                            className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80';
                            }}
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-white text-sm">{destination.name}</h3>
                          <p className="text-xs text-white/60">{destination.country}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Styles Section */}
      <section className="border-y border-fuchsia-100 bg-gradient-to-r from-[#21133e] to-[#2a1a4e]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3 lg:px-8">
          {travelStyles.map(([title, text]) => (
            <div key={title} className="group p-6 rounded-lg hover:bg-white/5 transition">
              <h2 className="text-lg font-bold text-white">{title} Trips</h2>
              <p className="mt-2 leading-7 text-white/75 group-hover:text-white/90 transition">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Places to Explore Section */}
      <section id="places" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-accent">Destination Finder</p>
            <h2 className="mt-2 text-4xl font-bold text-primary-text">Explore Trending Places</h2>
            <p className="mt-2 text-primary-text-soft">Discover hand-picked destinations curated just for curious travelers.</p>
          </div>
          <a href="/destinations" className="w-fit rounded-lg border-2 border-primary-accent px-6 py-3 text-sm font-semibold text-primary-accent hover:bg-fuchsia-50 transition">
            View All Destinations
          </a>
        </div>
        <DestinationGrid destinations={destinations.slice(0, 6)} />
      </section>

      {/* Planning Tips Section */}
      <section className="bg-gradient-to-br from-white to-fuchsia-50/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.75fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-accent">Travel Smarter</p>
            <h2 className="mt-2 text-4xl font-bold text-primary-text">Planning Tips & Guides</h2>
            <p className="mt-4 leading-7 text-primary-text-soft">
              Small choices shape the whole journey. Use these tips as a starting point before choosing routes, stays, and daily plans.
            </p>
          </div>
          <div className="grid gap-4">
            {planningNotes.map((note, index) => (
              <div key={note} className="group rounded-lg border-2 border-primary-accent/20 bg-white p-6 hover:border-primary-accent/50 hover:bg-white/80 transition cursor-pointer">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-600 to-cyan-500">
                  <span className="text-sm font-bold text-white">{index + 1}</span>
                </div>
                <p className="leading-7 text-primary-text-soft group-hover:text-primary-text transition">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-accent">Easy Booking</p>
            <h2 className="mt-2 text-4xl font-bold text-primary-text">Book With Confidence</h2>
            <p className="mt-2 text-primary-text-soft">Create an account, choose a destination, and keep every booking organized in your dashboard.</p>
          </div>
          <a href="/register" className="w-fit rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:from-fuchsia-500 hover:to-cyan-400 transition">
            Get Started Free
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Browse Destinations', desc: 'Search places by country, city, and travel style with advanced filters.' },
            { title: 'Book Your Trip', desc: 'Pick your traveler count and confirm tickets with instant confirmation.' },
            { title: 'Manage Bookings', desc: 'View and organize your confirmed tickets in one easy dashboard.' }
          ].map((item) => (
            <div key={item.title} className="group rounded-lg border-2 border-primary-accent/20 bg-white p-8 hover:border-primary-accent/50 hover:shadow-lg hover:scale-105 transition cursor-pointer">
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-fuchsia-600 to-cyan-500 opacity-20 group-hover:opacity-30 transition" />
              <h3 className="text-lg font-bold text-primary-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-primary-text-soft">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="border-t border-fuchsia-100 bg-primary-bg py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary-text-soft">Trusted by travelers worldwide</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-4 text-center">
            {[
              { label: 'Safe & Secure', icon: '🔒' },
              { label: 'No Hidden Fees', icon: '✓' },
              { label: 'Best Price Guarantee', icon: '💰' },
              { label: 'Customer Support', icon: '💬' }
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl">{item.icon}</p>
                <p className="mt-2 text-sm font-semibold text-primary-text">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

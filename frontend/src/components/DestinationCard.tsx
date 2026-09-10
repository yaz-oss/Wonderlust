import type { Destination } from '../types'
import { getDestinationImage, getFallbackDestinationImage } from '../utils/destinationImages'

interface Props {
  destination: Destination
  onBook?: (destination: Destination) => void
}

export default function DestinationCard({ destination, onBook }: Props) {
  return (
    <article className="group overflow-hidden rounded-xl border border-fuchsia-100/50 bg-white shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-primary-accent/30 cursor-pointer">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-bg to-fuchsia-100">
        <img
          src={getDestinationImage(destination)}
          alt={destination.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          onError={(event) => {
            event.currentTarget.src = getFallbackDestinationImage(destination)
          }}
        />
        
        {/* Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

        {/* Category Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-accent shadow-lg backdrop-blur-sm">
          {destination.category}
        </div>

        {/* Rating Badge */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-3 py-1 text-sm font-bold text-white shadow-lg">
          <span>⭐</span>
          <span>{destination.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-primary-text line-clamp-2 group-hover:text-primary-accent transition">
            {destination.name}
          </h3>
          <p className="text-sm text-primary-text-soft mt-1">
            {[destination.city, destination.country].filter(Boolean).join(', ')}
          </p>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-5 text-primary-text-soft mb-4 min-h-[2.5rem]">
          {destination.description}
        </p>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-4 border-t border-fuchsia-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary-text-soft">📍</span>
            <span className="text-xs text-primary-text-soft">{destination._count?.bookings ?? 0} bookings</span>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-fuchsia-50 text-primary-accent font-semibold">
            View Details
          </span>
        </div>

        {onBook && (
          <button
            onClick={() => onBook(destination)}
            type="button"
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-fuchsia-500 hover:to-cyan-400 hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            Book Now
          </button>
        )}
      </div>
    </article>
  )
}

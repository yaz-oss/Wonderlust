import type { Destination } from '../../types'
import DestinationCard from '../DestinationCard'

interface Props {
  destinations: Destination[]
  onBook?: (destination: Destination) => void
}

export default function DestinationGrid({ destinations, onBook }: Props) {
  if (destinations.length === 0) {
    return (
      <div className="rounded-lg border border-primary-accent-cyan/20 bg-primary-bg-secondary p-8 text-center text-primary-text-soft">
        No destinations found.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} onBook={onBook} />
      ))}
    </div>
  )
}

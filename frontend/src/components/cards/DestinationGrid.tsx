import DestinationCard from './DestinationCard'

interface Destination {
  id: string
  name: string
  country: string
  image?: string
  rating: number
  category: string
}

interface Props {
  destinations: Destination[]
}

export default function DestinationGrid({ destinations }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map(dest => (
        <DestinationCard key={dest.id} destination={dest} />
      ))}
    </div>
  )
}

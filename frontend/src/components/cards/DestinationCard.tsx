interface Destination {
  id: string
  name: string
  country: string
  image?: string
  rating: number
  category: string
}

interface Props {
  destination: Destination
}

export default function DestinationCard({ destination }: Props) {
  return (
    <div className="group bg-primary-bg-secondary backdrop-blur-md border border-primary-accent-cyan/20 rounded-2xl overflow-hidden hover:border-primary-accent-cyan/50 transition cursor-pointer shadow-glow hover:shadow-glow-cyan">
      {destination.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary-text mb-1">{destination.name}</h3>
        <p className="text-sm text-primary-text-soft mb-3">{destination.country}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-primary-accent/20 text-primary-accent px-3 py-1 rounded-full">
            {destination.category}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-primary-accent-cyan">★</span>
            <span className="text-sm text-primary-text">{destination.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

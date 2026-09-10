// User types
export interface User {
  id: string
  email: string
  username: string
  name: string
  role?: 'USER' | 'ADMIN'
  bio?: string
  avatar?: string
  followers?: number
  following?: number
  createdAt?: Date
}

// Destination types
export interface Destination {
  id: string
  name: string
  country: string
  city?: string
  description: string
  image?: string
  latitude: number
  longitude: number
  rating: number
  category: string
  _count?: {
    bookings: number
  }
}

export interface Booking {
  id: string
  ticketCode: string
  travelerName: string
  travelers: number
  visitDate: string
  totalPrice: number
  status: 'CONFIRMED' | 'CANCELLED'
  destination: Destination
  user?: User
  seat?: string
  createdAt: string
}

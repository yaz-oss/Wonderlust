// User types
export interface User {
  id: string
  email: string
  username: string
  name: string
  bio?: string
  avatar?: string
  followers: number
  following: number
  createdAt: Date
}

// Post types
export interface Post {
  id: string
  userId: string
  title: string
  description: string
  images: string[]
  location: string
  latitude: number
  longitude: number
  likes: number
  comments: number
  createdAt: Date
}

// Destination types
export interface Destination {
  id: string
  name: string
  country: string
  description: string
  image: string
  latitude: number
  longitude: number
  rating: number
  category: string
}

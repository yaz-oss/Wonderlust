import type { Destination } from '../types'

const fallbackImages: Record<string, string> = {
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  tokyo: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  'new york': 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80',
  'swiss alps': 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1200&q=80',
  santorini: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
  'machu picchu': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  rome: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80',
  sydney: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
  maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
  barcelona: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80',
  'cape town': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80',
}

const categoryImages: Record<string, string> = {
  beach: fallbackImages.maldives,
  city: fallbackImages.tokyo,
  coast: fallbackImages.sydney,
  heritage: fallbackImages.rome,
  island: fallbackImages.santorini,
  mountain: fallbackImages['swiss alps'],
}

export function getDestinationImage(destination: Pick<Destination, 'name' | 'category' | 'image'>) {
  const name = destination.name.toLowerCase()
  const category = destination.category.toLowerCase()

  return destination.image || fallbackImages[name] || categoryImages[category] || fallbackImages.paris
}

export function getFallbackDestinationImage(destination: Pick<Destination, 'name' | 'category'>) {
  const name = destination.name.toLowerCase()
  const category = destination.category.toLowerCase()

  return fallbackImages[name] || categoryImages[category] || fallbackImages.paris
}

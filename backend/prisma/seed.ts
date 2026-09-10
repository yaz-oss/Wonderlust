import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/utils/crypto.js'

const prisma = new PrismaClient()

const ADMIN_EMAIL = 'ishimweyaziid749@gmail.com'
const ADMIN_PASSWORD = 'yaz 2009'

async function seedAdmin() {
  const password = await hashPassword(ADMIN_PASSWORD)

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      password,
      role: 'ADMIN',
      username: 'admin',
      name: 'Admin'
    },
    create: {
      email: ADMIN_EMAIL,
      username: 'admin',
      name: 'Admin',
      password,
      role: 'ADMIN'
    }
  })

  console.log(`Admin user ready: ${ADMIN_EMAIL}`)
}

async function seedDestinations() {
  const destinations = [
    {
      name: 'Paris',
      country: 'France',
      city: 'Paris',
      description: 'The City of Light, known for the Eiffel Tower, art galleries, and romantic atmosphere.',
      latitude: 48.8566,
      longitude: 2.3522,
      category: 'city',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800'
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      city: 'Tokyo',
      description: 'A vibrant metropolis combining traditional temples with modern technology.',
      latitude: 35.6762,
      longitude: 139.6503,
      category: 'city',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a4?w=800'
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      city: 'Denpasar',
      description: 'Tropical paradise with beautiful beaches, rice terraces, and spiritual temples.',
      latitude: -8.6705,
      longitude: 115.2126,
      category: 'beach',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1566393336342-c4e3f4a36c8e?w=800'
    },
    {
      name: 'New York',
      country: 'United States',
      city: 'New York',
      description: 'The city that never sleeps, famous for Times Square, Broadway, and iconic skyscrapers.',
      latitude: 40.7128,
      longitude: -74.0060,
      category: 'city',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800'
    },
    {
      name: 'Swiss Alps',
      country: 'Switzerland',
      city: 'Interlaken',
      description: 'Breathtaking mountain scenery perfect for hiking, skiing, and adventure sports.',
      latitude: 46.6863,
      longitude: 8.6302,
      category: 'mountain',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800'
    },
    {
      name: 'Santorini',
      country: 'Greece',
      city: 'Oia',
      description: 'Whitewashed villages, cliffside views, blue-domed churches, and glowing Aegean sunsets.',
      latitude: 36.4618,
      longitude: 25.3753,
      category: 'island',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800'
    },
    {
      name: 'Machu Picchu',
      country: 'Peru',
      city: 'Cusco Region',
      description: 'Ancient Incan stonework set high above cloud forest valleys and dramatic Andean peaks.',
      latitude: -13.1631,
      longitude: -72.545,
      category: 'heritage',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800'
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      city: 'Dubai',
      description: 'Bold architecture, desert escapes, luxury shopping, beach clubs, and sweeping skyline views.',
      latitude: 25.2048,
      longitude: 55.2708,
      category: 'city',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800'
    },
    {
      name: 'Rome',
      country: 'Italy',
      city: 'Rome',
      description: 'Layered history, piazzas, ruins, fountains, and long meals tucked into lively side streets.',
      latitude: 41.9028,
      longitude: 12.4964,
      category: 'heritage',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800'
    },
    {
      name: 'Sydney',
      country: 'Australia',
      city: 'Sydney',
      description: 'Harbor icons, coastal walks, surf beaches, green parks, and relaxed waterfront neighborhoods.',
      latitude: -33.8688,
      longitude: 151.2093,
      category: 'coast',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800'
    },
    {
      name: 'Maldives',
      country: 'Maldives',
      city: 'Male Atoll',
      description: 'Clear lagoons, soft white sand, coral reefs, and calm island stays over turquoise water.',
      latitude: 3.2028,
      longitude: 73.2207,
      category: 'beach',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800'
    },
    {
      name: 'Barcelona',
      country: 'Spain',
      city: 'Barcelona',
      description: 'Gaudi architecture, beachside evenings, market lunches, and walkable neighborhoods full of color.',
      latitude: 41.3874,
      longitude: 2.1686,
      category: 'city',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800'
    },
    {
      name: 'Cape Town',
      country: 'South Africa',
      city: 'Cape Town',
      description: 'Mountain trails, beaches, vineyards, cultural neighborhoods, and ocean views around every bend.',
      latitude: -33.9249,
      longitude: 18.4241,
      category: 'coast',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800'
    }
  ]

  let created = 0
  let updated = 0

  for (const destination of destinations) {
    const existingDestination = await prisma.destination.findFirst({
      where: {
        name: destination.name,
        country: destination.country
      }
    })

    if (existingDestination) {
      await prisma.destination.update({
        where: { id: existingDestination.id },
        data: destination
      })
      updated += 1
    } else {
      await prisma.destination.create({ data: destination })
      created += 1
    }
  }

  console.log(`Destinations ready: ${created} created, ${updated} updated`)
}

async function main() {
  try {
    await seedAdmin()
    await seedDestinations()
  } catch (error) {
    console.error('Seed error:', error)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()

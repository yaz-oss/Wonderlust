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
  const existingDestinations = await prisma.destination.count()

  if (existingDestinations > 0) {
    console.log(`Destinations already seeded: ${existingDestinations}`)
    return
  }

  const destinations = await prisma.destination.createMany({
    data: [
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
      }
    ]
  })

  console.log(`Created ${destinations.count} destinations`)
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

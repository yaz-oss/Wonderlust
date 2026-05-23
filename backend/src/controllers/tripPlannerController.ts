import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../middleware/auth.js'
import { generateTripPlan } from '../services/aiService.js'

const prisma = new PrismaClient()

export const generatePlan = async (req: AuthRequest, res: Response) => {
  try {
    const { destination, budget, days, tripType } = req.body
    const userId = req.userId

    if (!destination || !budget || !days) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Generate AI plan
    const planData = await generateTripPlan(destination, budget, days, tripType)

    // Save to database
    const tripPlan = await prisma.tripPlan.upsert({
      where: { userId: userId! },
      update: {
        destination,
        budget,
        days,
        tripType,
        itinerary: JSON.stringify(planData.itinerary),
        activities: planData.activities
      },
      create: {
        userId: userId!,
        destination,
        budget,
        days,
        tripType,
        itinerary: JSON.stringify(planData.itinerary),
        activities: planData.activities
      }
    })

    res.json({ 
      message: 'Trip plan generated',
      tripPlan: {
        ...tripPlan,
        itinerary: JSON.parse(tripPlan.itinerary)
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate trip plan' })
  }
}

export const getUserTripPlans = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId

    const tripPlans = await prisma.tripPlan.findMany({
      where: { userId }
    })

    res.json({ 
      tripPlans: tripPlans.map((plan: { itinerary: string }) => ({
        ...plan,
        itinerary: JSON.parse(plan.itinerary)
      }))
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trip plans' })
  }
}

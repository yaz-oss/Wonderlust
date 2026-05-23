import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const generateTripPlan = async (destination: string, budget: number, days: number, tripType: string) => {
  try {
    const prompt = `Generate a ${days}-day trip plan for ${destination} with a budget of $${budget}. 
    Trip type: ${tripType}. 
    Please provide:
    1. Daily itinerary
    2. Recommended activities
    3. Budget breakdown
    4. Best time to visit
    5. Local tips
    Return as JSON.`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    })

    const content = response.choices[0].message.content
    return JSON.parse(content || '{}')
  } catch (error) {
    console.error('AI trip planner error:', error)
    throw new Error('Failed to generate trip plan')
  }
}

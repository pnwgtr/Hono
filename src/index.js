import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// 🔐 Enable CORS for all routes
app.use('*', cors())

// Helper function to calculate ROI
function calculateROI(sle, aroBefore, aroAfter, controlsCost) {
  const aleBefore = sle * aroBefore
  const aleAfter = sle * aroAfter
  const riskReduction = aleBefore - aleAfter
  const roi = controlsCost > 0 ? (riskReduction / controlsCost) * 100 : 0
  return { aleBefore, aleAfter, riskReduction, roi }
}

// POST endpoint to compute ROI
app.post('/calculate', async (c) => {
  const body = await c.req.json()
  const { sle, aroBefore, aroAfter, controlsCost } = body
  const result = calculateROI(sle, aroBefore, aroAfter, controlsCost)
  return c.json(result)
})

// Home route
app.get('/', (c) => {
  return c.text('Cyber Risk ROI API — POST to /calculate with SLE, AROs, and Controls Cost')
})

export default app

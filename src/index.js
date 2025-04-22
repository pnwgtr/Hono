// cyberroi-app/src/index.js
import { Hono } from 'hono'

const app = new Hono()

// Helper function to calculate ROI
function calculateROI(sle, aroBefore, aroAfter, controlsCost) {
  const aleBefore = sle * aroBefore
  const aleAfter = sle * aroAfter
  const riskReduction = aleBefore - aleAfter
  const roi = controlsCost > 0 ? (riskReduction / controlsCost) * 100 : 0
  return { aleBefore, aleAfter, riskReduction, roi }
}

// API route to compute ROI metrics
app.post('/calculate', async (c) => {
  const body = await c.req.json()
  const { sle, aroBefore, aroAfter, controlsCost } = body

  const result = calculateROI(sle, aroBefore, aroAfter, controlsCost)
  return c.json(result)
})

// Simple homepage
app.get('/', (c) => {
  return c.text('Cyber Risk ROI API — POST to /calculate with SLE, AROs, and Controls Cost')
})

export default app

import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static frontend files from the /public folder
app.use('*', serveStatic({ root: './' }))

// ROI Calculator Endpoint
app.post('/calculate', async (c) => {
  const { sle, aroBefore, aroAfter, controlsCost } = await c.req.json()

  const aleBefore = sle * aroBefore
  const aleAfter = sle * aroAfter
  const riskReduction = aleBefore - aleAfter
  const roi = controlsCost > 0 ? (riskReduction / controlsCost) * 100 : 0

  return c.json({ aleBefore, aleAfter, riskReduction, roi })
})

export default app

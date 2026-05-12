import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'

// Initialize Express
const app = express()

// Connect MongoDB
await connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send("API Working")
})

// Sentry test route
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
})

// Clerk webhook route
app.post("/webhooks", clerkWebhooks)

// Error handler (must be after routes)
Sentry.setupExpressErrorHandler(app)

// PORT
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
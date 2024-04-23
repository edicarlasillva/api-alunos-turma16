import cors from 'cors'
import express from 'express'

import authRoutes from './routes/auth.routes'
import studentRoutes from './routes/students.routes'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.use(studentRoutes)
  app.use(authRoutes)

  return app
}
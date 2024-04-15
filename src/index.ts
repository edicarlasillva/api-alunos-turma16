import cors from 'cors'
import express from 'express'
import swagger from 'swagger-ui-express'

import authRoutes from './routes/auth.routes'
import studentRoutes from './routes/students.routes'

import swaggerJson from './docs/swagger.json'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/docs', swagger.serve)
app.use('/docs', swagger.setup(swaggerJson))

app.use(studentRoutes)
app.use(authRoutes)

app.listen(3333, () => {
  console.log('🚀 Server ready at: http://localhost:3333')
})
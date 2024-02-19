import express, { Request, Response } from 'express'
import cors from 'cors'

import { StudentController } from './controllers/student.controller'

const app = express()

app.use(express.json())
app.use(cors())

const studentController = new StudentController()

app.get('/students', studentController.index)

app.post('/students', studentController.store)

app.get('/students/:id', studentController.show)

app.listen(3333, () => {
  console.log('🚀 Server ready at: http://localhost:3333')
})
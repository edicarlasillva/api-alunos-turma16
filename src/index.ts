import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3333, () => {
  console.log('🚀 Server ready at: http://localhost:3333')
})
import express from 'express'
import routes from './routes/index.mjs'

const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

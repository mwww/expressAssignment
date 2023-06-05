const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    secret: '🙀',
    resave: false,
    saveUninitialized: true,
  })
)

mongoose
  .connect('mongodb://127.0.0.1:27017/expressAssignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err))

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/todo', require('./routes/todos'))

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

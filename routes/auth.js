const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.render('signup', {
        error: 'already exist',
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    req.session.user = newUser
    res.redirect('/auth/profile')
  } catch (err) {
    console.error('Error signing up:', err)
    res.render('signup', { error: 'An error occurred' })
  }
})

router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/auth/profile')
  }
  res.render('login')
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.render('login', { error: 'Invalid username or password' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.render('login', { error: 'Invalid username or password' })
    }

    req.session.user = { _id: user._id, username: user.username }
    res.redirect('/todo/')
  } catch (err) {
    console.error('Error logging in:', err)
    res.render('login', { error: 'An error occurred' })
  }
})

router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login')
  }

  console.log(req.session.user)

  res.render('profile', { user: req.session.user })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/auth/profile')
  }
  res.redirect('/auth/login')
})

module.exports = router

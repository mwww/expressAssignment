const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // res.render('index')
  res.redirect('/todo')
})

module.exports = router

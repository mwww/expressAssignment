const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Todo = require('../models/todo')

const getTodos = require('../helpers/getTodos')

router.use('*', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login')
  }
  next()
})

/*
  === TODO === (how ironic…)
  - add todo
  - mark as done
*/

router.get('/', async (req, res) => {
  const user = req.session.user
  // console.log(user.id);
  const todos = await getTodos(user._id)
  // console.log('todos from space', todos)
  res.render('todos', {
    user: user,
    todos: todos,
  })
  // res.render('todos', {
  //   user: user,
  //   todos: {
  //     incomplete: [
  //       { _id: 'idk man', title: 'mam ayam', description: 'ayam enak' },
  //     ],
  //   },
  // })
})

module.exports = router

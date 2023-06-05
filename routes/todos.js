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
  [x] add todo
  [x] mark as done
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

router.get('/add', async (req, res) => {
  res.render('add')
})

router.post('/add', async (req, res) => {
  const { title, description } = req.body
  const user = req.session.user
  const newTodo = new Todo({ user_id: user._id, title, description })
  await newTodo.save()
  res.redirect('/todo')
})

router.get('/mad', async (req, res) => {
  if (req.query.id) {
    Todo.findOne({ _id: req.query.id })
      .then((todo) => {
        if (todo) {
          todo.completed = true
          return todo.save()
        } else {
          console.log('Todo not found')
        }
      })
      .then(() => {
        console.log('Todo updated successfully')
      })
      .catch((error) => {
        console.error('Error updating Todo', error)
      })

    res.redirect('/todo')
  }
})

module.exports = router

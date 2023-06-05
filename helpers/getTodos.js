const Todo = require('../models/todo')

module.exports = async function getTodos(userId) {
  // console.log('userId', userId)
  const todos = await Todo.find({ user_id: userId })
  // console.log('todos', todos)
  const parsedTodos = todos.reduce(
    (acc, todo) => {
      if (todo.completed) {
        acc.completed.push(todo)
      } else {
        acc.incomplete.push(todo)
      }
      return acc
    },
    { completed: [], incomplete: [] }
  )
  // console.log('parsedTodos', parsedTodos)
  return parsedTodos
}

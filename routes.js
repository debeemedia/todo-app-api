const express = require('express')
const { addTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require('./todo.controller')
const router = express.Router()

router.post('/add', addTodo )
router.get('', getTodos)
router.get('/:id', getTodoById)
router.put('/:id/edit', updateTodo)
router.delete('/:id/remove', deleteTodo)

module.exports = router

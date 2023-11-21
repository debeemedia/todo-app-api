const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    day: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    reminder: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model('Todo', todoSchema)
module.exports = TodoModel

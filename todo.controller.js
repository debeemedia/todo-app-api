const TodoModel = require("./todo.model");

async function addTodo (req, res) {
    try {
        const {task, day, completed, reminder} = req.body
        
        if (!task || !day || completed === undefined || completed === null) {
            return res.status(400).json({success: false, message: 'Provide required field'})
        }

        if (typeof completed !== 'boolean') {
            return res.status(400).json({success: false, message: 'Completed field must be of type boolean'})
        }

        const todo = new TodoModel({task, day, completed, reminder})

        await todo.save()

        res.status(201).json({success: true, message: 'Todo created'})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function getTodos (req, res) {
    try {
        const todos = await TodoModel.find()

        if (todos.length < 1) {
            return res.status(404).json({success: false, message: 'No todos found'})
        }

        res.status(200).json({success: true, message: todos})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function getTodoById (req, res) {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(400).json({success: false, message: 'Provide an id'})
        }

        const todo = await TodoModel.findById(id)
        if (!todo) {
            return res.status(404).json({success: false, message: 'Todo not found'})
        }

        res.status(200).json({success: true, message: todo})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function updateTodo (req, res) {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(400).json({success: false, message: 'Provide an id'})
        }

        const todo = await TodoModel.findById(id)
        if (!todo) {
            return res.status(404).json({success: false, message: 'Todo not found'})
        }

        await TodoModel.findByIdAndUpdate(id, req.body)

        res.status(200).json({success: true, message: 'Todo updated'})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

async function deleteTodo (req, res) {
    try {
        const {id} = req.params
        if (!id) {
            return res.status(400).json({success: false, message: 'Provide an id'})
        }

        const todo = await TodoModel.findById(id)
        if (!todo) {
            return res.status(404).json({success: false, message: 'Todo not found'})
        }

        await TodoModel.findByIdAndDelete(id)

        res.status(200).json({success: true, message: 'Todo deleted'})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}

module.exports = {
    addTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
}

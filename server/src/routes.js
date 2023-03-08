const express = require('express')
const routes = express.Router()

const TaskController = require('./models/TaskController')

routes.get('/tasks',TaskController.index)
routes.post('/tasks',TaskController.create)
routes.put('/tasks/:id', TaskController.update)
routes.delete('/tasks/:id', TaskController.delete)

module.exports = routes;
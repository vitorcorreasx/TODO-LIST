const Task = require('../models/TaskController');
const knexconfig = require('../../knexfile')

const knex = require('knex')(knexconfig.development)

module.exports = knex;
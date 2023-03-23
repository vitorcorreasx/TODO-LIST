const { ValidationError } = require('apollo-server');
const knex = require('../database/index');

module.exports = {
  async create(req){
      const username = req.username;
      const password = req.password;
      
      await knex('users').insert({
        username: username,
        password: password
      })
  },
  async login(req){
    const username = req.username;
    const password = req.password;

    const [validUser] = await knex('users').where({
      username: username,
      password: password
    })
    console.log(validUser)
  },
}
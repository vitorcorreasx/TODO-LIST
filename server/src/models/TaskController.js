const knex = require('../database/index');

module.exports = {
  async get() {
    const results = await knex('tasks')
    return results
  },
  async create(req){
    try{
      const { content } = req;
      await knex('tasks').insert({content})

    }catch(error){
      console.log(error)
    }
  },
  async update(req){
    try{
      const content  = req.content;
      const id = req.id;

      await knex('tasks').where({id}).update({content})
  
    }
    catch(error){
      console.log(error)
    }
  },
  async delete(req){
    try{
      const { id } = req;

      await knex('tasks').where({ id }).del()
    }
    catch(error){
      console.log(error)
    }
  }
}
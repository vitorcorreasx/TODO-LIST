const knex = require('../database/index');

module.exports = {
  async index(req, res) {
    const results = await knex('tasks')
    return res.json(results)
  },
  async create(req, res, next){
    try{
      const { content } = req.body;

      await knex('tasks').insert({content})

      return res.status(201).send()
    }catch(error){
      next(error)
    }
  },
  async update(req, res, next){
    try{
      const { content } = req.body;
      const { id } = req.params;

      await knex('tasks').where({ id }).update({ content })
      return res.send()
    }
    catch(error){
      next(error)
    }
  },
  async delete(req, res, next){
    try{
      const { id } = req.params;

      await knex('tasks').where({ id }).del()
      return res.send()
    }
    catch(error){
      next(error)
    }
  }
}
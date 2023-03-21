const knex = require('../database/index');

module.exports = {
  async get() {
    const results = await knex('tasks')
    return results
  },
  async create(req){
      const {content} = req;
      const checkItem = await knex('tasks').where({content})
      const [checkContent] = checkItem.map(item => item.content)

      if(content === checkContent)  {
        return
      }
      await knex('tasks').insert({content})
  },
  async update(req){
      const content  = req.content;
      const id = req.id;

      await knex('tasks').where({id}).update({content})
  },
  async delete(req){
      const { id } = req;

      await knex('tasks').where({ id }).del()
    }
}
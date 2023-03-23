const knex = require('../database/index');

module.exports = {
  async get(req) {
    const user = req.user_id
    const results = await knex('tasks').where('user_id', user)
    return results
},
  async create(req){
      const {content} = req;
      // fazer create por user id
      const checkItem = await knex('tasks').where({content})
      const [checkContent] = checkItem.map(item => item.content)

      if(content === checkContent)  {
        return
      }
      await knex('tasks').insert({
        content: content,
        user_id: user_id
      })
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
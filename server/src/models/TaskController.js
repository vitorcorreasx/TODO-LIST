module.exports = {
  async get(req, knex) {
    const userId = req.user_id
    return await knex('tasks').where('user_id', userId)
},
  async create(req, knex){
       const content = req.content;
       const userId = req.user_id;
       const [checkItem] = await knex('tasks').where({content: content, user_id: userId})
       if(!checkItem)  {
         await knex('tasks').insert({
           content: content,
           user_id: userId
         })
       }
  },
  async update(req, knex){
      const content  = req.content;
      const id = req.id;

      await knex('tasks').where({id}).update({content})
  },
  async delete(req, knex){
      const { id } = req;

      await knex('tasks').where({ id }).del()
    }
}
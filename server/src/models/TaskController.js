module.exports = {
  async get(req, ctx) {
    const user = req.user_id
    const results = await ctx('tasks').where('user_id', user)
    return results
},
  async create(req, ctx){
       const content = req.content;
       const user_id = req.user_id;
       const [checkItem] = await ctx('tasks').where({content: content, user_id: user_id})
       if(!checkItem)  {
         await ctx('tasks').insert({
           content: content,
           user_id: user_id
         })
       }
  },
  async update(req, ctx){
      const content  = req.content;
      const id = req.id;

      await ctx('tasks').where({id}).update({content})
  },
  async delete(req, ctx){
      const { id } = req;

      await ctx('tasks').where({ id }).del()
    }
}
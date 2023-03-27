module.exports = {
  async create(req, ctx){
      const username = req.username;
      const password = req.password;
      
      await ctx('users').insert({
        username: username,
        password: password
      })
  },
  async login(req, ctx){
    const [validUser] = await ctx('users').where({
      username: req.username,
      password: req.password
    }).select('id_user')
    return validUser
  },
}

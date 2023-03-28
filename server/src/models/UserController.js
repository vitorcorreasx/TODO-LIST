module.exports = {
  async create(req, ctx){
      const username = req.username;
      const password = req.password;
      const [checkUser] = await ctx('users').where({username: username})

      if(!checkUser){
        await ctx('users').insert({
          username: username,
          password: password
        })
        return this.login({
          username: username,
          password: password
        }, ctx)
      }  
  },
  async login(req, ctx){
    const [validUser] = await ctx('users').where({
      username: req.username,
      password: req.password
    }).select('user_id')
    return validUser
  },
}

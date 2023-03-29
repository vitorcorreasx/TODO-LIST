module.exports = {
  async create(req, knex){
      const username = req.username;
      const password = req.password;
      const [checkUser] = await knex('users').where({username: username})

      if(!checkUser){
        await knex('users').insert({
          username: username,
          password: password
        })
        return this.login({
          username: username,
          password: password
        }, knex)
      }  
  },
  async login(req, knex){
    const [validUser] = await knex('users').where({
      username: req.username,
      password: req.password
    }).select('user_id')
    return validUser
  },
}

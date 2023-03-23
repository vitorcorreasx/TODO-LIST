const {ApolloServer} = require('apollo-server') 
const TaskController = require('./models/TaskController');
const UserController = require('./models/UserController');
require('dotenv').config()

const typeDefs = `
 type User {
   id_user: Int!
   username: String!
   password: String!
 }
  type Task {
    id: Int!
    content: String!
    user: [User!]
  }
  type Query {
    allTasks(user_id: Int!): [Task]
  }
  type Mutation {
    createUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): User
    createTask(content: String!): Task
    deleteTask(id: Int!): Task
    updateTask(id: Int!, content: String!): Task
  }`

const resolvers = {
  Query: {
    async allTasks(_, args) {
      return await TaskController.get(args)
    }
  },
  
  Mutation: {
    async createUser(_, args){
      await UserController.create({
        username: args.username,
        password: args.password
      })
    },
    async loginUser(_, args){
      await UserController.login({
        username: args.username,
        password: args.password
      })
    },

    async createTask(_, {content}){
      await TaskController.create({ content: content })
      return
    },
    async deleteTask(_, {id}){
      await TaskController.delete({ id })
		},
    async updateTask(_, args){
      const item = {
        id: args.id,
        content: args.content
      }
      await TaskController.update(item)
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({port: process.env.PORT}).then(({url}) =>{
  console.log(url)
})

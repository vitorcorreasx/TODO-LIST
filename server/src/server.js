const {ApolloServer} = require('apollo-server') 
const database = require('./database/index');
const TaskController = require('./models/TaskController');
const UserController = require('./models/UserController');
require('dotenv').config()

const typeDefs = `
 type User {
   user_id: Int!
   username: String!
   password: String!
 }
  type Task {
    id: Int!
    content: String!
    user: [User!]
  }
  type Query {
    loginUser(username: String!, password: String!): User
    allTasks(user_id: Int!): [Task]
  }
  type Mutation {
    createUser(username: String!, password: String!): User
    createTask(user_id: Int!, content: String!): Task
    deleteTask(id: Int!): Task
    updateTask(id: Int!, content: String!): Task
  }`

const resolvers = {
  Query: {
    async loginUser(_, args, {database}) {
     return await UserController.login(args, database)
    },
    async allTasks(_, args, {database}) {
      return await TaskController.get(args, database)
    }
  },
  
  Mutation: {
    async createUser(_, args, {database}){
      return await UserController.create(args, database)
    },
    async createTask(_, args, {database}){
      return await TaskController.create(args, database)
    },
    async deleteTask(_, {id}, {database}){
      await TaskController.delete({ id }, database)
		},
    async updateTask(_, args, {database}){
      const item = {
        id: args.id,
        content: args.content
      }
      await TaskController.update(item, database)
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:  () => {
   return {database}
  }
});

server.listen({port: process.env.PORT}).then(({url}) =>{
  console.log(url)
})

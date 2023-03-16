const {ApolloServer} = require('apollo-server') 
const TaskController = require('./models/TaskController')

const typeDefs = `
  type Task {
    id: Int!
    content: String!
  }
  type Query {
    allTasks: [Task]
  }
  type Mutation {
    createTask(content: String!): Task
    deleteTask(id: Int!): Task
    updateTask(id: Int!, content: String!): Task
  }
`;
const resolvers = {
  Query: {
    allTasks: async () => {
      const res = await TaskController.index()
      return res
    }
  },
  
  Mutation: {
    async createTask(_, {content}){
      await TaskController.create({ content })
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

server.listen({port: 64001}).then(({url}) =>{
  console.log(url)
})

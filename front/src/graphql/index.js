const login =
 `query ($username: String!, $password: String!){
    loginUser (username: $username, password: $password){
      user_id
    }
}
`
const register = `
  mutation 
    createUser($username: String!, $password: String!){
      createUser (username: $username, password: $password){
        user_id
    }
}
`
const createTask = `
  mutation 
    createTask($user_id: Int!, $content: String!){
      createTask(user_id: $user_id content: $content) {
        content
  }
}
`
const deleteTask = `
  mutation
    deleteTask($id: Int!) {
      deleteTask(id: $id){
        id
      }
    }
`
const updateTask = `
  mutation
    updateTask($id: Int!, $content: String!) {
      updateTask(id: $id, content: $content){
        id
        content
      }
    }
`
const getTasks = `
  query ($user_id: Int!) {
    allTasks(user_id: $user_id){
      id
      content
      user {
        user_id
    }
  }
}
`
export {login, register, createTask, deleteTask, updateTask, getTasks}
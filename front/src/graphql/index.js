const login =
 `query ($username: String!, $password: String!){
    loginUser (username: $username, password: $password){
      user_id
    }
}
`
const createTask = `
  mutation 
    createTask($userId: Int!, $content: String!){
      createTask(user_id: $userId content: $content) {
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
  query ($userId: Int!) {
    allTasks(user_id: $userId){
      id
      content
      user {
        user_id
    }
  }
}
`
export {login ,createTask, deleteTask, updateTask, getTasks}
const login =
 `query ($username: String!, $password: String!){
    loginUser (username: $username, password: $password){
      id_user
    }
}
`
const createTask = `
  mutation 
    createTask($user_id: Int!, $content: String!){
      createTask(user_id: $user_id, content: $content) {
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
        id_user
    }
  }
}
`
export {login ,createTask, deleteTask, updateTask, getTasks}
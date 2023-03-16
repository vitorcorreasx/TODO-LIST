const createTask = `
  mutation 
    createTask ($text: String!) {
      createTask(content: $text) {
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
  query {
    allTasks {      
        id
        content
    }
  }
`
export {createTask, deleteTask, updateTask, getTasks}
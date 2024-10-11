export const DELETE_TODO = `
mutation($id: ID!) {
  deleteTodos(where: { id: $id }) {
    nodesDeleted
  }
}`

export const UPDATE_TODO = `
mutation UpdateTodos($where: TodoWhere, $update: TodoUpdateInput) {
  updateTodos(where: $where, update: $update) {
    todos {
      id
      content
      done
    }
  }
}`

export const TODOS = `
query Todos($where: TodoWhere) {
  todos(where: $where) {
    id
    content
    done
  }
}
`
export const CREATE_TODO = `
mutation CreateTodos($input: [TodoCreateInput!]!) {
  createTodos(input: $input) {
    todos {
      id
      content
      done
    }
  }
}
`
export const CREATE_TODOLIST = `
mutation createTodoLists($input: [TodoListCreateInput!]!) {
  createTodoLists(input: $input) {
    todoLists {
      id
      owner {
        username
      }
      title
    }
  }
}`;

export const DELETE_TODOLIST = `
mutation DeleteTodoLists($where: TodoListWhere) {
  deleteTodoLists(where: $where) {
    nodesDeleted
  }
}
`;

export const TODOLISTS = `
query TodoLists($where: TodoListWhere) {
  todoLists(where: $where) {
    id
    title
  }
}
`;

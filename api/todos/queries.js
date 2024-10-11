import { API_URL } from "../api_url";
import { CREATE_TODO, CREATE_TODOLIST , UPDATE_TODO , TODOLISTS, DELETE_TODO , DELETE_TODOLIST , TODOS } from "./mutations";

function createAuthHeaders(token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
}

export function createTodoList(username, title, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: createAuthHeaders(token),
      body: JSON.stringify({
        query: CREATE_TODOLIST,
        variables: {
          "input": [
            {
              "owner": {
                "connect": {
                  "where": {
                    "username": username
                  }
                }
              },
              "title": title
            }
          ]
        }
      })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.createTodoLists.todoLists[0];
    })
    .catch(error => {
      console.log('error API', error.message);
      throw error;
    });
  }
  
  export function getTodoLists(username, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: createAuthHeaders(token),
      body: JSON.stringify({
        query: TODOLISTS,
        variables: {
          "where": {
            "owner": {
              "username": username
            }
          }
        }
      })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.todoLists;
    })
    .catch(error => {
      console.log('error API', error.message);
      throw error;
    });
  }
  
  export function deleteTodoList(id, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: createAuthHeaders(token),
      body: JSON.stringify({
        query: DELETE_TODOLIST,
        variables: {
          "where": {
            "id": id
          }
        }
      })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.deleteTodoLists.nodesDeleted;
    })
    .catch(error => {
      console.log('error API', error.message);
      throw error;
    });
  }
  
  export function createTodo(content, todoListId, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        query: CREATE_TODO,
        variables: {
          "input": [
            {
              "belongsTo": {
                "connect": {
                  "where": {
                    "id": todoListId
                  }
                }
              },
              "content": content
            }
          ]
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.createTodos.todos[0]
      })
      .catch(error => {
          console.log('error API', error.message)
        throw error
      })
  }

  export function getTodos(todoListId, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        query: TODOS,
        variables: {
          "where": {
            "belongsTo": {
              "id": todoListId
            }
          }
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.todos
      })
      .catch(error => {
          console.log('error API', error.message)
        throw error
      })
  }
  export function updateTodo(todoId, update, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        query: UPDATE_TODO,
        variables: {
          "where": {
            "id": todoId
          },
          "update": update
        }
      })
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.updateTodos.todos[0]
    })
    .catch(error => {
      console.log('error API', error.message)
      throw error
    });
  }export function deleteTodo(id, token) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        query: DELETE_TODO,
        variables: {
          id: id
        }
      })
    })
      .then(response => {
        return response.json()
      })
      .then(jsonResponse => {
        if (jsonResponse.errors != null) {
          throw jsonResponse.errors[0]
        }
        return jsonResponse.data.deleteTodos.nodesDeleted
      })
      .catch(error => {
          console.log('error API', error.message)
        throw error
      })
  }
  export const updateTodoList = async (id, title, token) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          mutation UpdateTodoList($id: ID!, $title: String!) {
            updateTodoLists(
              where: { id: $id },
              update: { title: $title }
            ) {
              todoLists {
                id
                title
              }
            }
          }
        `,
        variables: {
          id,
          title
        }
      }),
    });
  
    const jsonResponse = await response.json();
    if (jsonResponse.errors) {
      throw new Error(jsonResponse.errors[0].message || 'Error updating TodoList');
    }
    return jsonResponse.data.updateTodoLists.todoLists[0];
  };
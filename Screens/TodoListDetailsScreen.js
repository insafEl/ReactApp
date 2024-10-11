import React, { useState, useEffect, useContext } from 'react';
import { TokenContext } from '../Context/Context';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos/queries';
import TodoListDetails from '../Components/TodoListDetails';

export default function TodoListDetailsScreen({ route }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const { todoListId } = route.params;
  const [token] = useContext(TokenContext);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    getTodos(todoListId, token)
      .then(fetchedTodos => setTodos(fetchedTodos))
      .catch(console.error);
  }, [todoListId, token]);

  const handleAddNewTodo = (newText) => {
    createTodo(newText, todoListId, token)
      .then(newTodo => {
        setTodos([...todos, newTodo]);
      })
      .catch(console.error);
  };

  const handleToggleTodo = (todoId, done) => {
    updateTodo(todoId, { done: !done }, token)
      .then(updatedTodo => {
        setTodos(todos.map(todo => todo.id === todoId ? updatedTodo : todo));
      })
      .catch(error => {
        console.error(error);
        setTodos(todos); 
      });
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsEditModalVisible(true);
  };

  const updateTodoContent = (todoId, newContent) => {
    updateTodo(todoId, { content: newContent }, token)
      .then(updatedTodo => {
        setTodos(todos.map(todo => todo.id === todoId ? updatedTodo : todo));
      })
      .catch(console.error);
    setIsEditModalVisible(false);
    setEditingTodo(null);
  };

  const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId, token)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== todoId));
      })
      .catch(console.error);
  };

  const totalTodos = todos.length;
  const completedCount = todos.filter(item => item.done).length;
  const remainingTodos = totalTodos - completedCount;
  const filteredTodos = todos.filter(item => {
    if (filter === 'completed') return item.done;
    if (filter === 'incomplete') return !item.done;
    return true;
  });


  return (
    <TodoListDetails
      todos={todos}
      remainingTodos={todos.length - todos.filter(item => item.done).length}
      handleAddNewTodo={handleAddNewTodo}
      handleToggleTodo={handleToggleTodo}
      handleEditTodo={handleEditTodo}
      handleDeleteTodo={handleDeleteTodo}
      filter={filter}
      setFilter={setFilter}
      isEditModalVisible={isEditModalVisible}
      setIsEditModalVisible={setIsEditModalVisible}
      editingTodo={editingTodo}
      updateTodoContent={updateTodoContent}
    />
  );
}
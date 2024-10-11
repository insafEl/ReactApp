import React, { useState, useEffect, useContext } from 'react';
import { UsernameContext, TokenContext } from '../Context/Context';
import { getTodoLists, getTodos } from '../api/todos/queries';
import Home from '../Components/Home';

export default function HomeScreen() {
  const [username] = useContext(UsernameContext);
  const [token] = useContext(TokenContext);
  const [todoListCount, setTodoListCount] = useState(0);
  const [completedTodos, setCompletedTodos] = useState(0);
  const [nonCompletedTodos, setNonCompletedTodos] = useState(0);


  const loadData = async () => {
    try {
      const todoLists = await getTodoLists(username, token);
      setTodoListCount(todoLists.length);

      let totalCompleted = 0;
      let totalTodos = 0;
      let totalNonCompleted = 0;
      for (const list of todoLists) {
        const todos = await getTodos(list.id, token);
        totalCompleted += todos.filter((todo) => todo.done).length;
        const nonCompletedCount = todos.filter(todo => !todo.done).length;
        totalNonCompleted += nonCompletedCount;
        totalTodos += todos.length;
      }
      setCompletedTodos(totalCompleted / totalTodos);
      setNonCompletedTodos(totalNonCompleted);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    if (token && username) {
      loadData();
    }
  }, [username, token, loadData]);

  return (
    <Home
      username={username}
      todoListCount={todoListCount}
      completedTodos={completedTodos}
      nonCompletedTodos={nonCompletedTodos}
      onRefresh={loadData}
    />
  );
}
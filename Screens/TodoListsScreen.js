import React, { useState, useEffect, useContext } from 'react';
import { View,StyleSheet } from 'react-native';
import { createTodoList, getTodoLists, deleteTodoList, updateTodoList } from '../api/todos/queries';
import Input from '../Components/UI/Input';
import { TokenContext, UsernameContext } from '../Context/Context';
import TodoLists from '../Components/TodoLists';

export default function TodoListsScreen({ navigation }) {
  const [todoLists, setTodoLists] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTodoList, setSelectedTodoList] = useState(null);
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);
  useEffect(() => {
    if (token && username) {
      getTodoLists(username, token)
        .then(data => setTodoLists(data))
        .catch(console.error);
    }
  }, [token, username]);


  const handleCreateTodoList = async (title) => {
    const newList = await createTodoList(username, title, token);
    setTodoLists([...todoLists, newList]);
  };

  const handleDeleteTodoList = async (id) => {
    await deleteTodoList(id, token);
    setTodoLists(todoLists.filter(list => list.id !== id));
  };

  const handleEditTodoList = (todoList) => {
    setSelectedTodoList(todoList);
    setIsEditModalVisible(true);
  };

  const handleSaveEditedTodoList = async (newTitle) => {
    if (selectedTodoList) {
      await updateTodoList(selectedTodoList.id, newTitle, token);
      setIsEditModalVisible(false);
      const updatedTodoLists = await getTodoLists(username, token);
      setTodoLists(updatedTodoLists);
    }
  };
  const handleNavigateToTodoListDetails = (todoListId) => {
    navigation.navigate('TodoListDetails', { todoListId });
  };
  return (
    <View style={styles.container}>
      <Input onSubmit={handleCreateTodoList} placeholder="New TodoList Title" />
      <TodoLists
        todoLists={todoLists}
        onNavigateToTodoListDetails={handleNavigateToTodoListDetails}
        onEditTodoList={handleEditTodoList}
        onDeleteTodoList={handleDeleteTodoList}
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        selectedTodoList={selectedTodoList}
        onSaveEditedTodoList={handleSaveEditedTodoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


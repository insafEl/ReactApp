import React from 'react';
import { View, FlatList, Button, Text, StyleSheet } from 'react-native';
import TodoItem from '../Components/TodoItem';
import ProgressBar from '../Components/UI/ProgressBar';
import Input from '../Components/UI/Input';
import EditTodoModal from '../Components/UI/EditTodoModal';

const TodoListDetails = ({ 
  todos, 
  remainingTodos, 
  handleAddNewTodo, 
  handleToggleTodo, 
  handleEditTodo, 
  handleDeleteTodo, 
  filter, 
  setFilter, 
  isEditModalVisible, 
  setIsEditModalVisible, 
  editingTodo, 
  updateTodoContent 
}) => {
  return (
    <View style={styles.container}>
      <Input 
        onSubmit={handleAddNewTodo}
        placeholder='Saisir ici un nouvel item'
      />

      <View style={styles.remainingCounterContainer}>
        <Text>
          Todos restants : <Text style={styles.remainingCounterText}>{remainingTodos}</Text> 
        </Text>
      </View>

      <ProgressBar completed={todos.filter(item => item.done).length} total={todos.length} />

      <FlatList
        data={todos.filter(item => {
          if (filter === 'completed') return item.done;
          if (filter === 'incomplete') return !item.done;
          return true;
        })}
        renderItem={({ item, index }) => (
          <TodoItem
            item={item}
            number={index + 1}
            onDelete={() => handleDeleteTodo(item.id)}
            onEdit={() => handleEditTodo(item)}
            toggleSwitch={() => handleToggleTodo(item.id, item.done)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />

      <View style={styles.filterButtonsContainer}>
        <View style={styles.filterButton}>
            <Button title="Tout afficher" onPress={() => setFilter('all')} color="#6200EE"/>
            </View>
            <View style={styles.filterButton}>
            <Button title="Afficher terminés" onPress={() => setFilter('completed')} color="#6200EE" />
            </View>
            <View style={styles.filterButton}>
            <Button title="Afficher en cours" onPress={() => setFilter('incomplete')} color="#6200EE" />
        </View>
      </View>

      <EditTodoModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={(newContent) => updateTodoContent(editingTodo.id, newContent)}
        initialContent={editingTodo ? editingTodo.content : ''}
        title="Todos"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    addTodoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
      borderRadius: 5,
      marginHorizontal: 10,
      marginTop: 10,
    },
    input: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    filterButtonsContainer: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
      borderRadius: 5,
      marginHorizontal: 10,
      marginTop: 10,
      padding: 10,
      alignItems: 'center',
    },
  
    filterButton: {
      marginBottom: 10,
      width: '80%',
      backgroundColor: '#6200EE',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    remainingCounterContainer: {
      padding: 10,
      backgroundColor: '#ffffff',
      marginHorizontal: 10,
      marginTop: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
      alignItems: 'center',
      marginBottom : 10,
    },
  
    remainingCounterText: {
      fontSize: 16,
      color: '#6200EE', 
    },
  });
  

export default TodoListDetails;

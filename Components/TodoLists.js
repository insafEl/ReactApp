import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import EditTodoModal from "../Components/UI/EditTodoModal";

const TodoLists = ({
  todoLists,
  onNavigateToTodoListDetails,
  onEditTodoList,
  onDeleteTodoList,
  isEditModalVisible,
  setIsEditModalVisible,
  selectedTodoList,
  onSaveEditedTodoList
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={todoLists}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text onPress={() => onNavigateToTodoListDetails(item.id)}>
              {item.title}
            </Text>
            <View style={styles.switchAndButtons}>
              <TouchableOpacity onPress={() => onEditTodoList(item)} style={styles.editButton}>
                <Image source={require('../ressources/edit.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteTodoList(item.id)} style={styles.deleteButton}>
                <Image source={require('../ressources/trash-can-outline.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <EditTodoModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={onSaveEditedTodoList}
        initialContent={selectedTodoList ? selectedTodoList.title : ''}
        title="TodoList"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginHorizontal: 10, 
      marginTop: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5, 
      shadowRadius: 3.84,
      elevation: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
    },
    editButton: {
      padding: 8,
    },
    deleteButton: {
      padding: 8,
    },
    icon: {
      width: 20,
      height: 20,
    },
    switchAndButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default TodoLists;

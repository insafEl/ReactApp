import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Switch } from 'react-native';

export default function TodoItem({ item, number, onDelete, onEdit, toggleSwitch }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, item.done ? { textDecorationLine: 'line-through' } : {}]}>
        {number}. {item.content}
      </Text>
      <View style={styles.switchAndButtons}>
        <Switch
          value={item.done}
          onValueChange={() => toggleSwitch(item.id)}
          trackColor={{ false: "#767577", true: "#6200EE" }} 
          thumbColor={item.done ? "#f5dd4b" : "#f4f3f4"}
        />
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.button}>
          <Image
            source={require('../ressources/edit.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <Image
            source={require('../ressources/trash-can-outline.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 20,
      marginHorizontal: 10, 
      marginTop: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5, 
      shadowRadius: 3.84,
      elevation: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      flex: 1,
      marginHorizontal: 10,
    },
    switchAndButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 20,
      height: 20,
    },
    
  });
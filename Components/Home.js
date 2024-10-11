import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from '../Components/UI/ProgressBar';

const Home = ({ username, todoListCount, completedTodos, nonCompletedTodos, onRefresh }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome back, <Text style={styles.username}>{username || 'Guest'}.</Text>
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Todo Lists: <Text style={styles.number}>{todoListCount}</Text>
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Todos completed: <Text style={styles.number}>{Math.round(completedTodos * 100)}%</Text>
        </Text>
        <ProgressBar completed={completedTodos} total={1} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Todos Left: <Text style={styles.number}>{nonCompletedTodos}</Text></Text>
        <ProgressBar completed={nonCompletedTodos} total={todoListCount*10}/> 
      </View>

      <View>
        <TouchableOpacity onPress={onRefresh} style={styles.button}>
          <Text style={styles.buttonText}>Refresh Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#6200EE',
    },
    number: {
      fontWeight: 'bold',
      color: '#6200EE',
    },
    infoContainer: {
      width: '80%',
      alignItems: 'center',
      marginBottom: 20,
    },
    infoText: {
      fontSize: 18,
      marginBottom: 10,
    },
    button: {
      width: '120%',
      height: 50,
      backgroundColor: '#6200EE',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default Home;

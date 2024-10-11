import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Input = ({ onSubmit, placeholder }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSubmit(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
      />
      <Button title="Submit" onPress={handleSubmit} color="#6200EE" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'gray',
      marginRight: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 5,
      backgroundColor: '#FFF',
      fontSize: 16,
      color: '#000',
    },
    button: {
      backgroundColor: '#6200EE',
      borderRadius: 5,
      padding: 10, 
      justifyContent: 'center', 
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
    },
  });
  

export default Input;

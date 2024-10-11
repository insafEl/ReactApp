import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUp from '../Components/SignUp';
import { signUp } from '../api/user/queries';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(username, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SignUp
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSignUpPress={handleSignUp}
      />
      {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignIn from "../Components/SignIn";
import { signIn } from '../api/user/queries';
import { TokenContext, UsernameContext } from '../Context/Context';

export default function SignInScreen() {
  const [, setToken] = useContext(TokenContext);
  const [, setUsername] = useContext(UsernameContext);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    try {
      const token = await signIn(login, password);
      setToken(token);
      setUsername(login);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SignIn
        login={login}
        setLogin={setLogin}
        password={password}
        setPassword={setPassword}
        onSignInPress={handleSignIn}
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
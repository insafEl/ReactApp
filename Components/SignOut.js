import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const SignOut = ({ onSignOutPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.signOutText}>Are you sure you want to sign out?</Text>
      <Button title="Sign me out" onPress={onSignOutPress} color="#f44336" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signOutText: {
    marginBottom: 10,
    fontSize: 18,
  },
});

export default SignOut;

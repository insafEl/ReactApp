import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpSCreen';
import SignOutScreen from '../Screens/SignOutScreen';
import TodoListsScreen from '../Screens/TodoListsScreen';
import { TokenContext } from '../Context/Context';
import TodoListDetailsScreen from '../Screens/TodoListDetailsScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [token] = useContext(TokenContext);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {token == null ? (
          <>
            <Tab.Screen name='SignIn' component={SignInScreen} />
            <Tab.Screen name='SignUp' component={SignUpScreen} />
          </>
        ) : (
          <>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='TodoLists' component={TodoListsScreen} />
            <Tab.Screen name="TodoListDetails" component={TodoListDetailsScreen} />
            <Tab.Screen name='SignOut' component={SignOutScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/containers/LoginScreen';
import HomeScreen from './src/containers/HomeScreen';
import RoommateViewPostScreen from './src/containers/RoommateViewPostScreen';
import RoomViewPostScreen from './src/containers/RoomViewPostScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen  name="RoommateViewPostScreen" component={RoommateViewPostScreen} />
        <Stack.Screen  name="LoginScreen" component={LoginScreen} />
        <Stack.Screen  name="HomeScreen" component={HomeScreen} />
        <Stack.Screen  name="RoomViewPostScreen" component={RoomViewPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

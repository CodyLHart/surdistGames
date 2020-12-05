import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './pages/LandingPage'
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LightsOut from './pages/LightsOut';
import MarbleSolitaire from './pages/MarbleSolitaire';

const Stack = createStackNavigator();

export default function App() {
  const [currentPage, setCurrentPage] = useState('IntroSequence')

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={null}  
      >
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
        />
        <Stack.Screen 
          name="LightsOut"
          component={LightsOut}
        />
        <Stack.Screen 
          name="MarbleSolitaire"
          component={MarbleSolitaire}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StatusBar } from 'expo-status-bar';


import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'

export default function App() {

  console.disableYellowBox = true;

  return ( 
    <NavigationContainer>
      <StatusBar style="black" />
      <StackNavigator/>
    </NavigationContainer>);
}
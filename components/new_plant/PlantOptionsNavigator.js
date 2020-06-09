import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewPlantHome from './NewPlantHome';
import Tutorials from './Tutorials';
import TakeNewPhoto from './TakeNewPhoto';
import MeasureFunction from './MeasureFunction';

const Stack = createStackNavigator();

function PlantOptionsNavigator() {
  return (
    <Stack.Navigator initialRouteName="new plant">
      <Stack.Screen name="new plant" component={NewPlantHome} />
      <Stack.Screen name="tutorials" component={Tutorials} />
      <Stack.Screen name="take photo" component={TakeNewPhoto} />
      <Stack.Screen name="measure plant" component={MeasureFunction} />
    </Stack.Navigator>
  );
}

export default PlantOptionsNavigator;

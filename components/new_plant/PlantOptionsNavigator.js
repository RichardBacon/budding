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
import MeasureFunction from './MeasureFunction';
import NewPlantEntry from './NewPlantEntry';
import ImageCapture from './ImageCapture';

const Stack = createStackNavigator();

function PlantOptionsNavigator() {
  return (
    <Stack.Navigator initialRouteName="new plant">
      <Stack.Screen name="new plant" component={NewPlantHome} />
      <Stack.Screen name="tutorials" component={Tutorials} />
      <Stack.Screen name="measure plant" component={MeasureFunction} />
      <Stack.Screen name="new plant entry" component={NewPlantEntry} />
      <Stack.Screen name="image capture" component={ImageCapture} />
    </Stack.Navigator>
  );
}

export default PlantOptionsNavigator;

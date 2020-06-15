import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewPlantHome from './NewPlantHome';
import Tutorials from './Tutorials';
import MeasureFunction from './MeasureFunction';
import ImagePickerScreen from './ImagePickerScreen';

const Stack = createStackNavigator();

function PlantOptionsNavigator() {
  return (
    <Stack.Navigator initialRouteName="new plant">
      <Stack.Screen name="new plant" component={NewPlantHome} />
      <Stack.Screen name="tutorial" component={Tutorials} />
      <Stack.Screen name="measure plant" component={MeasureFunction} />
      <Stack.Screen name="image picker" component={ImagePickerScreen} />
    </Stack.Navigator>
  );
}

export default PlantOptionsNavigator;

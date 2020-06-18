import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewPlantHome from './NewPlantHome';
import MeasureFunction from './MeasureFunction';
import NewPlantEntry from './NewPlantEntry';
import ImagePickerScreen from './ImagePickerScreen';
import NewSnapshotPage from './NewSnapshotPage';
import TutorialNavigator from '../tutorial/TutorialNavigator';

const Stack = createStackNavigator();

function PlantOptionsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'back',
        headerStyle: {
          height: 55,
        },
      }}
      initialRouteName="new plant"
    >
      <Stack.Screen name="new plant" component={NewPlantHome} />
      <Stack.Screen name="tutorial" component={TutorialNavigator} />
      <Stack.Screen name="measure plant" component={MeasureFunction} />
      <Stack.Screen name="new plant entry" component={NewPlantEntry} />
      <Stack.Screen name="image picker" component={ImagePickerScreen} />
      <Stack.Screen name="new snapshot" component={NewSnapshotPage} />
    </Stack.Navigator>
  );
}

export default PlantOptionsNavigator;

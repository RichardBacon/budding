import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Garden from './Garden';
import PlantPage from './PlantPage';

const Stack = createStackNavigator();

function GardenNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'back',
        headerStyle: {
          height: 55,
        },
      }}
      initialRouteName="garden"
    >
      <Stack.Screen name="garden" component={Garden} />
      <Stack.Screen name="plant page" component={PlantPage} />
    </Stack.Navigator>
  );
}

export default GardenNavigator;

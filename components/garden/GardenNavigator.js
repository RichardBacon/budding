import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Garden from './Garden';
import PlantPage from './PlantPage';
import EditPlant from './EditPlant';


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

      <Stack.Screen
        options={{ headerShown: false }}
        name="plant page"
        component={PlantPage}
      />
      <Stack.Screen name="edit plant" component={EditPlant} />
    </Stack.Navigator>
  );
}

export default GardenNavigator;

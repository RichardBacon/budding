import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewPlantHome from './NewPlantHome';
import MeasureFunction from './MeasureFunction';
import NewPlantEntry from './NewPlantEntry';
import ImagePickerScreen from './ImagePickerScreen';
import NewSnapshotPage from './NewSnapshotPage';
import TutorialNavigator from '../tutorial/TutorialNavigator';

const Stack = createStackNavigator();

function PlantOptionsNavigator({ userId, plant_id, pot_height, route }) {
  let plantId;
  let potHeight;
  let user_id;

  if (route.params) {
    if (route.params.params.plant_id) {
      potHeight = route.params.params.pot_height;
      plantId = route.params.params.plant_id;
    }
  }
  if (plant_id) {
    console.log('in if');
    const { plant_id, pot_height } = route.params;
  }
  if (userId) {
    user_id = userId;
  }

  if (pot_height) {
    potHeight = pot_height;
  }

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
      <Stack.Screen options={{ headerShown: false }} name="new plant">
        {(navigation) => (
          <NewPlantHome
            {...navigation}
            plant_id={plantId}
            pot_height={potHeight}
            userId={user_id}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name="tutorial"
        component={TutorialNavigator}
      />
      <Stack.Screen
        name="measure plant"
        options={{ headerShown: false }}
        name="measure plant"
        component={MeasureFunction}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="new plant entry"
        component={NewPlantEntry}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="image picker"
        component={ImagePickerScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="new snapshot"
        component={NewSnapshotPage}
      />
    </Stack.Navigator>
  );
}

export default PlantOptionsNavigator;

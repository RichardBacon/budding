import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewPlantHome from './NewPlantHome';
import MeasureFunction from './MeasureFunction';
import NewPlantEntry from './NewPlantEntry';
import ImagePickerScreen from './ImagePickerScreen';
import NewSnapshotPage from './NewSnapshotPage';
import TutorialNavigator from '../tutorial/TutorialNavigator';

const Stack = createStackNavigator();

function PlantOptionsNavigator({ route }) {
  let plantId;
  let potHeight;
  let user_id;

  if (route.params) {
    const { plant_id, pot_height, userId } = route.params;
    plantId = plant_id;
    potHeight = pot_height;
    user_id = userId;
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

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

  if (route.params) {
    const { plant_id, pot_height } = route.params;
    plantId = plant_id;
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
      <Stack.Screen name="new plant">
        {(navigation) => (
          <NewPlantHome
            {...navigation}
            plant_id={plantId}
            pot_height={potHeight}
          />
        )}
      </Stack.Screen>
      {/* <Stack.Screen name="new plant" component={NewPlantHome} plantInfo={route.params.plant_id}/> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="tutorial"
        component={TutorialNavigator}
      />
      <Stack.Screen
        name="measure plant"
        options={{ headerShown: false }}
        component={MeasureFunction}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="new plant entry"
        component={NewPlantEntry}
      />
      <Stack.Screen name="image picker" component={ImagePickerScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="new snapshot"
        component={NewSnapshotPage}
      />
    </Stack.Navigator>
  );
}

export default PlantOptionsNavigator;

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Garden from './Garden';
import PlantPage from './PlantPage';
import EditPlant from './EditPlant';
import Snapshots from './Snapshots';
import Test from './Test';
import PlantOptionsNavigator from '../new_plant/PlantOptionsNavigator';

const Stack = createStackNavigator();

function GardenNavigator({ userId, plant_id, from, route }) {
  let potHeight;
  let plantId;

  if (!userId) {
    let userId = route.params.userId;
  }

  if (!route.params) {
    plantId = null;
    potHeight = null;
  } else {
    potHeight = route.params.pot_height;
    plantId = route.params.plantId;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'back',
        headerStyle: {
          height: 80,
        },
      }}
      initialRouteName="garden"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="plant page"
        component={PlantPage}
      />

      <Stack.Screen name="garden" options={{ headerShown: false }}>
        {(navigation) => <Garden {...navigation} userId={userId} from={from} />}
      </Stack.Screen>
      <Stack.Screen
        name="edit plant"
        options={{ headerShown: false }}
        component={EditPlant}
      />
      <Stack.Screen
        name="all snapshots"
        options={{ headerShown: false }}
        component={Snapshots}
      />
      <Stack.Screen name="plant navigator" options={{ headerShown: false }}>
        {(navigation) => (
          <PlantOptionsNavigator
            {...navigation}
            userId={userId}
            pot_height={potHeight}
            plant_id={plantId}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="test page" component={Test} />
    </Stack.Navigator>
  );
}

export default GardenNavigator;

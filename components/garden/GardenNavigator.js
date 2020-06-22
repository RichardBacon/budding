import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Garden from './Garden';
import PlantPage from './PlantPage';
import EditPlant from './EditPlant';
import Snapshots from './Snapshots';
import Test from './Test';
import PlantOptionsNavigator from '../new_plant/PlantOptionsNavigator';

const Stack = createStackNavigator();

function GardenNavigator({ userId, from, route }) {
  if (!userId) {
    let userId = route.params.userId;
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
          <PlantOptionsNavigator {...navigation} userId={userId} />
        )}
      </Stack.Screen>

      <Stack.Screen name="test page" component={Test} />
    </Stack.Navigator>
  );
}

export default GardenNavigator;

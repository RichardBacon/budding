// import 'react-native-gesture-handler';
import * as React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Garden from './components/garden/Garden';
import PlantOptionsNavigator from './components/new_plant/PlantOptionsNavigator';
import GardenNavigator from './components/garden/GardenNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.bottomNav}
        tabBarOptions={{ activeTintColor: 'white', style: styles.bottomNav }}
        initialRouteName="login"
      >
        <Tab.Screen
          name="login"
          component={Login}
          options={{ tabBarVisible: false }}
        />
        <Tab.Screen name="garden" component={GardenNavigator} />
        <Tab.Screen name="new plant" component={PlantOptionsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    backgroundColor: '#355a3a',
    color: 'white',
  },
});

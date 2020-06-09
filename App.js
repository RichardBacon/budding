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
import MeasureFunction from './components/MeasureFunction';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MeasureFunction" component={MeasureFunction} />
      </Stack.Navigator>
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
});

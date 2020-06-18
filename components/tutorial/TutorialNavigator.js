import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import TutorialHome from './TutorialHome';

const Stack = createStackNavigator();

function TutorialNavigator() {
  return (
    <Stack.Navigator initialRouteName="tutorial">
      <Stack.Screen name="tutorial" component={TutorialHome} />
      <Stack.Screen name="step 1" component={Step1} />
      <Stack.Screen name="step 2" component={Step2} />
      <Stack.Screen name="step 3" component={Step3} />
    </Stack.Navigator>
  );
}

export default TutorialNavigator;

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import NewPlantHome from '../new_plant/NewPlantHome';

function TutorialHome({ navigation }) {
  return (
    <View>
      <Text>Tutorial Home</Text>
      <Button
        title="step 1"
        onPress={() => {
          navigation.navigate('step 1');
        }}
      />
      <Button
        title="step 2"
        onPress={() => {
          navigation.navigate('step 2');
        }}
      />
      <Button
        title="step 3"
        onPress={() => {
          navigation.navigate('step 3');
        }}
      />
      <Button
        title="back to new plant"
        onPress={() => {
          navigation.navigate('new plant');
        }}
      />
    </View>
  );
}

export default TutorialHome;

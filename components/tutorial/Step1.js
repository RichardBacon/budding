import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native';

function Step1({ navigation }) {
  return (
    <View>
      <Text>Step 1</Text>
      <Button
        title="step 2"
        onPress={() => {
          navigation.navigate('step 2');
        }}
      />
      <Button
        title="back to tutorial home"
        onPress={() => {
          navigation.navigate('tutorial');
        }}
      />
    </View>
  );
}

export default Step1;

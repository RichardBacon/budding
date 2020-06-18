import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';

function Step2({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#52875a',
      }}
    >
      <Text>Step 2</Text>
      <Image
        style={{ height: 600, width: 350 }}
        source={require('../../assets/tutorial_pot_measuring.gif')}
      />
      <Button
        title="step 1"
        onPress={() => {
          navigation.navigate('step 1');
        }}
      />
      <Button
        title="step 3"
        onPress={() => {
          navigation.navigate('step 3');
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

export default Step2;

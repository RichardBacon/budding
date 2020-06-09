import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
} from 'react-native';

function NewPlantHome({ navigation }) {
  console.log(navigation.navigate);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="tutorials"
        onPress={() => navigation.navigate('tutorials')}
      />
      <Button
        title="measure plant"
        onPress={() => navigation.navigate('measure plant')}
      />
      <Button
        title="take photo"
        onPress={() => navigation.navigate('take photo')}
      />
      <Button title="choose from library" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: '#00aeef',
//     borderColor: 'red',
//     borderWidth: 5,
//     borderRadius: 15,
//   },
// });

export default NewPlantHome;

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

function Tutorials({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tutorials</Text>
      <Button
        title="measure plant"
        onPress={() => navigation.navigate('measure plant')}
      />
    </View>
  );
}

export default Tutorials;

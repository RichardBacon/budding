import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  useEffect,
} from 'react-native';

function Tutorials(props) {
  const { openImagePickerAsync } = props.route.params;
  // const opacity = new Animated.Value(0);

  // useEffect(() => {
  //   Animated.timing(opacity, {
  //     toValue: 1,
  //     duration: 500,
  //   }).start();
  // }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tutorials</Text>
      <Button
        title="take photo"
        onPress={() => openImagePickerAsync()}
        // onPress={() => navigation.navigate('new plant')}
      />
    </View>
  );
}

export default Tutorials;

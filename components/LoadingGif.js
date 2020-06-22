import React from 'react';
import { View, Image, Dimensions } from 'react-native';

function LoadingGif() {
  let ScreenHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: ScreenHeight,
        backgroundColor: 'white',
      }}
    >
      <Image
        style={{ width: 100, height: 100, backgroundColor: 'white' }}
        source={require('../assets/gifs/Shifter_V01.gif')}
      />
    </View>
  );
}

export default LoadingGif;

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
import { RNS3 } from 'react-native-s3-upload';
const shortid = require('shortid');
const { options } = require('../../s3-config.js');

function MeasureFunction({ route }) {
  const { image } = route.params;
  const [bottomPotClick, setBottomPotClick] = useState(0);
  const [topPotClick, setTopPotClick] = useState(null);
  const [topPlantClick, setTopPlantClick] = useState(null);
  const pressCount = useRef(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderEnd: (e, gestureState) => {
        pan.flattenOffset();
      },
      onPanResponderRelease: (e, gestureState) => {
        const { moveY } = gestureState;

        if (pressCount.current === 0) {
          pressCount.current++;
          setBottomPotClick(moveY);
        } else if (pressCount.current === 1) {
          pressCount.current++;
          setTopPotClick(moveY);
        } else if (pressCount.current === 2) {
          pressCount.current++;
          setTopPlantClick(moveY);
        }
      },
    }),
  ).current;

  const calculateDistance = () => {
    const potHeight = 12.5;
    const unit = (bottomPotClick - topPotClick) / potHeight;
    let plantHeight = (topPotClick - topPlantClick) / unit;
    console.log(bottomPotClick, topPotClick, topPlantClick);
    // plantHeight = plantHeight * (1 + 0.15)

    console.log(plantHeight + 'CM  ----PLANT HEIGHT');
  };

  const resetMeasure = () => {
    setBottomPotClick(0);
    setTopPotClick(0);
    setTopPlantClick(0);
    pressCount.current = 0;
  };

  const submitPlant = () => {
    const name = shortid.generate();
    console.log(image);

    const file = {
      uri: image,
      name,
      type: 'image/jpg',
    };

    RNS3.put(file, options)
      .then((response) => {
        console.log('status: ', response.status);
        if (response.status === 201) {
          console.log('body: ', response.body);
          const { location } = response.body.postResponse;
          console.log(location);
        } else console.log('message: ', response.text);
      })
      .catch((err) => console.log(err));

    //setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text>Bottom pot: {bottomPotClick / 10}</Text>
      <Text>top of pot: {topPotClick}</Text>
      <Text>top of plant: {topPlantClick}</Text>
      <Text>{pressCount.current}</Text>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Image
        // onTouchStart={this.handleTouch}
        style={styles.logo}
        source={{
          uri: image,
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
        <View style={styles.box2} />
        <View style={styles.box3} />
      </Animated.View>
      <Button title={'submit'} onPress={submitPlant} />
      <Button title={'reset'} onPress={resetMeasure} />
      <Button title={'calculate'} onPress={calculateDistance} />
    </View>
  );
}

export default MeasureFunction;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//   },
//   tinyLogo: {
//     width: 50,
//     height: 50,
//   },
//   logo: {
//     width: 300,
//     height: 500,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    width: 450,
    height: 500,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    position: 'absolute',
    height: 100,
    width: 100,
    opacity: 0.3,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  box2: {
    position: 'absolute',
    height: 1,
    width: 100,
    marginTop: 50,
    opacity: 1,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  box3: {
    position: 'absolute',
    height: 100,
    width: 1,
    marginLeft: 50,
    opacity: 1,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 350,
    height: 450,
  },
});

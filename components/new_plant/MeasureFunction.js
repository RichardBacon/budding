import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';
import { set } from 'react-native-reanimated';

function MeasureFunction({ route, navigation }) {
  const { image, potHeight } = route.params;
  const [bottomPotClick, setBottomPotClick] = useState(null);
  const [topPotClick, setTopPotClick] = useState(null);
  const [topPlantClick, setTopPlantClick] = useState(null);
  const height = useRef(null);
  const pressCount = useRef(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const [showCalculateButton, setShow] = useState(false);
  const [resizedImage, setImage] = useState('');

  useEffect(() => {
    const runEffect = async () => {
      const resized = await ImageManipulator.manipulateAsync(image, [
        { resize: { width: 600 } },
      ]);
      setImage(resized.uri);
    };
    runEffect();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        const panTest = -385;
        return Animated.event([
          null,
          {
            dy: pan.y,
          },
        ])(evt, gestureState);
      },
      onPanResponderEnd: (e, gestureState) => {
        pan.flattenOffset();
      },
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        const { moveY } = gestureState;
      },
    }),
  ).current;

  const calculateDistance = () => {
    const promise = new Promise((resolve, reject) => {
      const unit = (bottomPotClick - topPotClick) / potHeight;
      let plantHeight = (topPotClick - topPlantClick) / unit;
      height.current = plantHeight;
      console.log(height.current);
      console.log(bottomPotClick, topPotClick, topPlantClick);
      // plantHeight = plantHeight * (1 + 0.15)

      // console.log(bottomPotClick, topPotClick, topPlantClick);
      console.log(plantHeight + 'CM  ----PLANT HEIGHT');
    }).then(navNextPage());
  };

  const navNextPage = () => {
    navigation.navigate('new plant entry', {
      resizedImage: image,
      potHeight,
      plantHeight: height.current,
    });
  };

  const addMarker = () => {
    const { _value } = pan.y;
    if (pressCount.current === 0) {
      pressCount.current++;
      setBottomPotClick(_value);
    } else if (pressCount.current === 1) {
      pressCount.current++;
      setTopPotClick(_value);
    } else if (pressCount.current === 2) {
      pressCount.current++;
      setTopPlantClick(_value);
      setShow(true);
    }
  };

  const resetMeasure = () => {
    setBottomPotClick(0);
    setTopPotClick(0);
    setTopPlantClick(0);
    pressCount.current = 0;
    setShow(false);
  };

  const plantInfo = {
    resizedImage,
    height,
    plantHeight: 7,
    potHeight: 12.5,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        {pressCount.current === 0
          ? `Place your first marker at the bottom of the pot`
          : pressCount.current === 1
          ? `Place your second marker at the top of the pot`
          : pressCount.current === 2
          ? `Place your third marker at the top of the plant`
          : `Confirm your measurements`}
      </Text>
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
        <View style={styles.oval} />
        <View style={styles.horizontal_line} />
        <View style={styles.vertical_line} />
      </Animated.View>
      {
        // image, s3 link, plant measurements, pot measurement
      }
      {!showCalculateButton && (
        <TouchableOpacity onPress={addMarker} style={styles.top_button}>
          <Text style={styles.buttonText}>{`add ${
            pressCount.current === 0
              ? 'first'
              : pressCount.current === 1
              ? 'second'
              : 'third'
          } marker`}</Text>
        </TouchableOpacity>
      )}
      {showCalculateButton && (
        <TouchableOpacity
          onPress={calculateDistance}
          style={styles.top_button_select}
        >
          <Text style={styles.buttonText}>calculate</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={resetMeasure} style={styles.button}>
        <Text style={styles.buttonText}>reset</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MeasureFunction;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    width: 450,
    height: 500,
  },
  headingText: {
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: -1,
  },
  oval: {
    zIndex: 10,
    elevation: 11,
    position: 'relative',
    height: 70,
    width: 300,
    opacity: 0.3,
    backgroundColor: '#fdbe39',
    borderRadius: 200,
  },
  horizontal_line: {
    position: 'absolute',
    height: 1,
    width: 300,
    marginTop: 35,
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  vertical_line: {
    position: 'absolute',
    height: 70,
    width: 1,
    marginLeft: 150,
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  top_button: {
    alignItems: 'center',
    height: 35,
    width: 200,
    marginTop: -60,
    backgroundColor: '#52875a',
    padding: 4,
    borderRadius: 5,
    marginBottom: 10,
    zIndex: 5,
    elevation: 5,
  },
  top_button_select: {
    backgroundColor: '#fdbe39',
    alignItems: 'center',
    height: 35,
    width: 200,
    marginTop: -60,
    padding: 4,
    borderRadius: 5,
    marginBottom: 10,
    zIndex: 5,
    elevation: 5,
  },
  button: {
    alignItems: 'center',
    height: 35,
    width: 200,
    backgroundColor: '#52875a',
    padding: 4,
    borderRadius: 5,
    marginBottom: 10,
    zIndex: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 300,
    height: 350,
  },
});

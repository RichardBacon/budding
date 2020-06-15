import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import { set } from 'react-native-reanimated';

function MeasureFunction({ route }) {
  const { image } = route.params;
  const [bottomPotClick, setBottomPotClick] = useState(null);
  const [topPotClick, setTopPotClick] = useState(null);
  const [topPlantClick, setTopPlantClick] = useState(null);
  const pressCount = useRef(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const [showCalculateButton, setShow] = useState(false);

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
      },
    }),
  ).current;

  const calculateDistance = () => {
    console.log(pan.y);
    const potHeight = 12;
    const unit = (bottomPotClick - topPotClick) / potHeight;
    let plantHeight = (topPotClick - topPlantClick) / unit;
    // console.log(bottomPotClick, topPotClick, topPlantClick);
    console.log(plantHeight + 'CM  ----PLANT HEIGHT');
  };

  const addMarker = () => {
    const { _value } = pan.y;
    console.log(pan);
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

  return (
    <View style={styles.container}>
      <Text>Bottom pot: {bottomPotClick}</Text>
      <Text>top of pot: {topPotClick}</Text>
      <Text>top of plant: {topPlantClick}</Text>
      <Text>{pressCount.current}</Text>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Image
        // onTouchStart={this.handleTouch}
        style={styles.logo}
        source={{
          // uri: 'https://i.ibb.co/hR0hV9h/Plant.png',
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
      {!showCalculateButton && (
        <TouchableOpacity onPress={addMarker} style={styles.button}>
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
        <TouchableOpacity onPress={calculateDistance} style={styles.button}>
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
  button: {
    backgroundColor: '#52875a',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
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

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
  ScrollView,
  SafeAreaView,
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
      onPanResponderMove: (evt, gestureState) => {
        // I need this space to do some other functions
        // This is where I imagine I should implement constraint logic
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
    // <View style={styles.container}>
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
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
          <View style={styles.oval} />
          <View style={styles.horizontal_line} />
          <View style={styles.vertical_line} />
        </Animated.View>
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
            style={styles.top_button}
          >
            <Text style={styles.buttonText}>calculate</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={resetMeasure} style={styles.button}>
          <Text style={styles.buttonText}>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetMeasure} style={styles.button}>
          <Text style={styles.buttonText}>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetMeasure} style={styles.button}>
          <Text style={styles.buttonText}>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetMeasure} style={styles.button}>
          <Text style={styles.buttonText}>reset</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    // </View>
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
  oval: {
    zIndex: 10,
    elevation: 11,
    position: 'relative',
    height: 70,
    width: 350,
    opacity: 0.3,
    backgroundColor: '#fdbe39',
    borderRadius: 200,
  },
  horizontal_line: {
    position: 'absolute',
    height: 1,
    width: 350,
    marginTop: 35,
    opacity: 1,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  vertical_line: {
    position: 'absolute',
    height: 70,
    width: 1,
    marginLeft: 175,
    opacity: 1,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  top_button: {
    marginTop: -65,
    backgroundColor: '#52875a',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    zIndex: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#52875a',
    padding: 20,
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
    width: 350,
    height: 450,
  },
});

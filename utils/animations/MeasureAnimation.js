import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Text,
  TouchableOpacity,
} from 'react-native';
import Arrow from '../../assets/tutorials/part_2/arrow.svg';
import ArrowFlipped from '../../assets/tutorials/part_2/arrow_flipped.svg';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MeasureAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(57),
      endValue: 2,
      duration: 1000,
      button1: new Animated.Value(1),
      button2: new Animated.Value(1),
      button3: new Animated.Value(1),
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.startValue, {
          toValue: 57,
          duration: 1000,
        }),
        Animated.timing(this.state.startValue, {
          toValue: -39,
          duration: 1000,
        }),
        Animated.timing(this.state.button1, {
          toValue: 0,
          duration: 1,
        }),
        Animated.timing(this.state.startValue, {
          delay: 1000,
          toValue: -189,
          duration: 1000,
        }),
        Animated.timing(this.state.button2, {
          toValue: 0,
          duration: 1,
        }),
        Animated.timing(this.state.button1, {
          delay: 1000,
          toValue: 1,
          duration: 1,
        }),
        Animated.timing(this.state.button2, {
          toValue: 1,
          duration: 1,
        }),
        Animated.timing(this.state.startValue, {
          toValue: 57,
          duration: 1000,
          opacity: 0.1,
        }),
      ]),
      {
        // iterations: 4
      },
    ).start();
    // Animated.loop(
    //   Animated.spring(this.state.startValue, {
    //     toValue: this.state.endValue,
    //     // friction: 1,
    //     // useNativeDriver: true,
    //     easing: Easing.back(),
    //     duration: this.state.duration
    //   }),
    //   {iterations: 1000},
    // ).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.square,
            {
              // opacity: this.state.fadeAnim,
              transform: [
                {
                  translateY: this.state.startValue,
                },
              ],
            },
          ]}
        >
          <View style={styles.arrow_container}>
            <View style={{ marginRight: 15 }}>
              <ArrowFlipped height={30} width={30}></ArrowFlipped>
            </View>
            <View>
              <View style={styles.oval}></View>
              <View style={styles.horizontal_line} />
              <View style={styles.vertical_line} />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Arrow height={30} width={30}></Arrow>
            </View>
          </View>
        </Animated.View>
        <View style={{ marginLeft: 135, marginTop: 90 }}>
          <Animated.View
            style={[
              styles.button_next_2,
              {
                opacity: this.state.button3,
              },
            ]}
          >
            <TouchableOpacity style={[styles.button_next_2]}>
              <Text style={styles.button_text_step_2}>third marker</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.button_next_2,
              {
                opacity: this.state.button2,
              },
            ]}
          >
            <TouchableOpacity style={[styles.button_next_2]}>
              <Text style={styles.button_text_step_2}>second marker</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.button_next,
              {
                opacity: this.state.button1,
              },
            ]}
          >
            <TouchableOpacity style={[styles.button_next]}>
              <Text style={styles.button_text_step_2}>first marker</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
  },
  arrow_container: {
    flexDirection: 'row',
    alignItems: 'center', // width: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    // alignContent: 'center',
    // width: 100,
  },
  square: {
    height: 20,
    width: 50,
    // backgroundColor: 'red',
  },
  oval: {
    zIndex: 10,
    elevation: 11,
    position: 'relative',
    height: 70,
    width: 200,
    opacity: 0.3,
    backgroundColor: '#fdbe39',
    borderRadius: 200,
  },
  horizontal_line: {
    position: 'absolute',
    height: 1,
    width: 200,
    marginTop: 35,
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  vertical_line: {
    position: 'absolute',
    height: 70,
    width: 1,
    marginLeft: 100,
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  button_next: {
    position: 'absolute',
    backgroundColor: '#52875a',
    borderRadius: 5,
    // marginLeft: 240,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 45,
  },
  button_next_2: {
    position: 'absolute',
    backgroundColor: '#52875a',
    borderRadius: 5,
    // marginLeft: 240,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 45,
  },
  button_text_step_2: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

// style={{
//   transform: [{ translateX: 1 }, { translateY: 100 }]
// }}

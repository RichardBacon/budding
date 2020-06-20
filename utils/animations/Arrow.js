import React, {Component} from 'react';
import {View, Animated, StyleSheet, Easing, Text} from 'react-native';
import Arrow from '../../assets/tutorials/part_2/arrow.svg'

export default class ArrowHead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(1),
      endValue: 2,
      duration: 1000,
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.startValue, {
          toValue: 80,
          duration: 800,
          // delay: 1000
        }),
        Animated.timing(this.state.startValue, {
          toValue: 1,
          duration: 500
        })
      ]),
      {
        // iterations: 4
      }
    ).start()
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.square,
            {
              transform: [
                {
                  translateY: this.state.startValue,
                },
              ],
            },
          ]}
        ><Arrow height={30}></Arrow></Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  square: {
    height: 20,
    width: 50,
    // backgroundColor: 'red',
  },
});
        
        
        
        
        // style={{
        //   transform: [{ translateX: 1 }, { translateY: 100 }]
        // }}

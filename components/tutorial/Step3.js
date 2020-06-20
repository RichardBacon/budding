import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Image,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { color } from 'react-native-reanimated';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import PotHeightSVG from '../../assets/tutorials/part_2/pot_measure_2.svg';
import MeasureAnimation from '../../utils/animations/MeasureAnimation';

import { auth } from 'firebase';

function Step1({ navigation }) {
  const [fontLoading, loadFont] = useState(false);
  let ScreenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        arciform: require('../../assets/fonts/Arciform.otf'),
      });
      loadFont(true);
    };
    loadFonts();
  }, []);

  return (
    <ScrollView>
      {fontLoading && (
        <View style={styles.container}>
          <Text style={styles.tutorial_heading}>3, measuring your plant</Text>
          <Text style={styles.tutorial_subheading}>
            calculate your plant's height by adding a marker at the bottom of
            the pot, the top of the pot, and the top of the plant
          </Text>

          <View style={styles.section_1_container}>
            <View style={styles.image_container}>
              <PotHeightSVG height={330} width={210}></PotHeightSVG>
            </View>
            <View style={styles.arrow_container}>
              <MeasureAnimation></MeasureAnimation>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button_next]}
            onPress={() => {
              navigation.navigate('new plant');
            }}
          >
            <Text style={styles.button_text_step_2}>choose a photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button_back]}
            onPress={() => {
              navigation.navigate('new plant');
            }}
          >
            <Text style={styles.button_text_back}>back to new plant page</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

export default Step1;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  section_1_container: {
    marginTop: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // paddingLeft: "7.5%",
    // height: 250,
    width: 270,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  image_container: {
    borderRadius: 10,
    marginTop: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // paddingLeft: "7.5%",
    height: 420,
    // width: '80%',
    // backgroundColor: 'white',
    // paddingLeft: "%",
    paddingRight: '5%',

    flex: 7,
  },
  arrow_container: {
    // width: '20%'
    marginTop: 210,
    position: 'absolute',
    flex: 1,
  },
  section_2_container: {
    marginTop: 20,
    flexDirection: 'row',
    height: 270,
    alignItems: 'center',
    width: '100%',
    paddingBottom: '1%',
    paddingLeft: '7.5%',
    paddingRight: '5%',
    backgroundColor: 'white',
  },
  section_3_container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
    // backgroundColor: 'white'
  },
  tutorial_heading: {
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: 15,
    color: 'blue',
    fontFamily: 'arciform',
    fontSize: 45,
    color: '#355a3a',
    textAlign: 'center', // <-- the magic
  },
  tutorial_heading_2: {
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: 15,
    color: 'blue',
    fontFamily: 'arciform',
    fontSize: 45,
    color: '#355a3a',
    textAlign: 'center', // <-- the magic
    textDecorationLine: 'underline',
  },
  tutorial_subheading: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    // marginBottom: 1,
    width: '75%',
  },
  tutorial_subheading_2: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    marginBottom: 25,
    width: '75%',
  },
  button_next: {
    backgroundColor: '#fdbe39',
    borderRadius: 5,
    // marginBottom: 15,
    marginTop: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  button_text_step_2: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_text_back: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
    color: '#52875a',
  },
  button_back: {
    // backgroundColor: '#52875a',
    borderRadius: 5,
    marginBottom: 20,
    // marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
});

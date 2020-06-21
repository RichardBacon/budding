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
import PotHeightSVG from '../../assets/tutorials/part_2/pot_measure.svg';
import Arrow from '../../utils/animations/Arrow';

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
          <Text style={styles.tutorial_heading}>2, measuring your pot</Text>
          <Text style={styles.tutorial_subheading}>
            we need your pot measurement to correctly calculate your plant's
            height
          </Text>

          <View style={styles.section_1_container}>
            <View style={styles.image_container}>
              <PotHeightSVG height={330} width={210}></PotHeightSVG>
            </View>
            <View style={styles.arrow_container}>
              <Arrow></Arrow>
            </View>
          </View>
          <Text style={styles.tutorial_heading_2}>12cm</Text>

          <Text style={styles.tutorial_subheading_2}>
            simply enter your height in the form provided, we'll store your
            pot's height for the next time you measure
          </Text>

          <TouchableOpacity
            style={[styles.button_next]}
            onPress={() => {
              navigation.navigate('step 3');
            }}
          >
            <Text style={styles.button_text_step_2}>step 3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button_back]}
            onPress={() => {
              navigation.navigate('step 1');
            }}
          >
            <Text style={styles.button_text_back}>back to step 1 </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

export default Step1;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  section_1_container: {
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // paddingLeft: "7.5%",
    // height: 250,
    width: 270,
    backgroundColor: 'white',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  image_container: {
    marginTop: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // paddingLeft: "7.5%",
    // height: 250,
    // width: '80%',
    backgroundColor: 'white',
    // paddingLeft: "%",
    paddingRight: '5%',

    flex: 7,
  },
  arrow_container: {
    // width: '20%'
    marginTop: 200,
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
    paddingTop: 25,
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
    width: '65%',
  },
  tutorial_subheading_2: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    marginBottom: 15,
    width: '65%',
  },
  button_next: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    // marginBottom: 15,
    marginTop: 20,
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

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { color } from 'react-native-reanimated';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import HeroImage from '../../assets/tutorials/part_1/part_1_hero_image.svg';
import AngleImage from '../../assets/tutorials/part_1/part_1_angle_of_plant.svg'
import ImageSVG from '../../assets/tutorials/part_1/part_1_middle_of_plant_tutorial.svg'

import { auth } from 'firebase';

function Step1({ navigation }) {

  const [fontLoading, loadFont] = useState(false);
  let ScreenWidth = Dimensions.get('window').width;

useEffect(() => {
  const loadFonts = async () => {
    await Font.loadAsync({
      'arciform': require('../../assets/fonts/Arciform.otf'),
    });
    loadFont(true);
  };
  loadFonts();
}, []);


  return (
    <ScrollView>
    {fontLoading && <View style={styles.container}>
      <Text style={styles.tutorial_heading}>Step 1</Text>
      <Text style={styles.tutorial_subheading}>taking your picture</Text>
      <View style={styles.hero_container}>
      <HeroImage width={300} height={300}></HeroImage>
      </View>
      <View style={styles.section_1_container}>
      <Text style={[styles.tutorial_1_copy, {flex: 1}]}>Keep your phone at a 90 degrees angle</Text>
      <View styles={{flex: 1}}>
      <AngleImage  width={175} height={200}></AngleImage>
      </View>
      </View>
      <View style={styles.section_2_container}>
      <View styles={{flex: 1}} >
      <ImageSVG   width={175} height={200}></ImageSVG>
      </View>
      <Text style={[styles.tutorial_2_copy, {flex: 1}]}>positioned your phone in the middle of the plant</Text>
      </View>

      <Button
        title="step 2"
        onPress={() => {
          navigation.navigate('step 2');
        }}
      />
      <Button
        title="back to tutorial home"
        onPress={() => {
          navigation.navigate('tutorial');
        }}
      />
    </View>}
    </ScrollView>
  );
}

export default Step1;



const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  section_1_container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: "7.5%",
    paddingRight: "7.5%"
  },
  section_2_container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: '10%',
    paddingLeft: '7.5%',
    paddingRight: "5%",
    backgroundColor: 'white'
  },
  tutorial_heading: {
    color: 'blue',
    fontFamily: 'arciform',
    fontSize: 45,
    color: '#355a3a',
  },
  tutorial_subheading: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    marginBottom: 25,
    width: '50%',
  },
  hero_container:  {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: "center",
  },
  tutorial_1_copy: {
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    paddingRight: 15,
    fontWeight: '600', 
    lineHeight: 19,
    letterSpacing: -0.1
  },
  tutorial_2_copy: {
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    paddingRight: 15,
    fontWeight: '600', 
    lineHeight: 19,
    letterSpacing: -0.1,
    paddingLeft: 30
  }
})
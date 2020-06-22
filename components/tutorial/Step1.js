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
import HeroImage from '../../assets/tutorials/part_1/part_1_hero_image.svg';
import AngleImage from '../../assets/tutorials/part_1/part_1_angle_of_plant.svg';
import ImageSVG from '../../assets/tutorials/part_1/part_1_middle_of_plant_tutorial.svg';
import PlantDistance from '../../assets/tutorials/part_1/part_1_plant_distance.svg';
// import PlantDistance from '../../assets/tutorials/part_1/d.svg';

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

  let ScreenHeight = Dimensions.get('window').height;

  return (
    <ScrollView>
      {fontLoading && (
        <View style={styles.container}>
          <Text style={styles.tutorial_heading}>1, taking your picture</Text>
          {/* <Text style={styles.tutorial_subheading}>choosing your picture</Text> */}
          <View style={styles.hero_container}>
            <HeroImage width={300} height={300}></HeroImage>
          </View>

          <View style={styles.section_2_container}>
            <View styles={{ flex: 1 }}>
              <ImageSVG width={175} height={200}></ImageSVG>
            </View>
            <Text style={[styles.tutorial_2_copy, { flex: 1 }]}>
              Position your phone midway between the top of the plant and the
              bottom of the pot
            </Text>
          </View>

          <View style={styles.section_1_container}>
            <Text style={[styles.tutorial_1_copy, { flex: 1 }]}>
              Keep your phone at a 90 degree angle.
            </Text>
            <View styles={{ flex: 1 }}>
              <AngleImage width={175} height={200}></AngleImage>
            </View>
          </View>

          <View style={styles.section_1_2_container}>
            <View styles={{ flex: 1 }}>
              <PlantDistance width={170} height={250}></PlantDistance>
            </View>
            <Text style={[styles.tutorial_2_copy, { flex: 1 }]}>
              When taking a photo of your plant, ensure you are not taking the
              photo too close, and that your plant and its pot are positioned in
              the middle of the screen.
            </Text>
          </View>

          <Text style={styles.tutorial_subheading_2}>
            examples of good photos
          </Text>

          <View style={styles.section_3_container}>
            <Image
              style={styles.picture_image_left}
              source={require('../../assets/tutorials/part_1/good_pic_1.jpg')}
            ></Image>
            <Image
              style={styles.picture_image_right}
              source={require('../../assets/tutorials/part_1/good_pic_2.jpg')}
            ></Image>
          </View>

          <Text style={styles.tutorial_subheading_3}>
            examples of bad photos
          </Text>

          <View style={styles.section_3_container}>
            <Image
              style={styles.picture_image_left}
              source={require('../../assets/tutorials/part_1/bad_pic_1.jpg')}
            ></Image>
            <Image
              style={styles.picture_image_right}
              source={require('../../assets/tutorials/part_1/bad_pic_2.jpg')}
            ></Image>
          </View>
          <TouchableOpacity
            style={[styles.button_next]}
            onPress={() => {
              navigation.navigate('step 2');
            }}
          >
            <Text style={styles.button_text_step_2}>step 2</Text>
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
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // height: ScreenHeight
    // backgroundColor: 'white',
  },
  section_1_container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: '7.5%',
    height: 250,
    paddingRight: '7.5%',
  },
  section_1_2_container: {
    marginTop: 20,
    flexDirection: 'row',
    height: 340,
    alignItems: 'center',
    width: '100%',
    paddingBottom: '1%',
    paddingTop: 10,
    paddingLeft: '7.5%',
    paddingRight: '5%',
    backgroundColor: 'white',
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
    paddingBottom: 20,
    color: 'blue',
    fontFamily: 'arciform',
    fontSize: 45,
    color: '#355a3a',
    textAlign: 'center', // <-- the magic
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
  tutorial_subheading_2: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    marginBottom: 10,
    marginTop: 25,
    width: '50%',
  },
  tutorial_subheading_3: {
    textAlign: 'center',
    marginBottom: 50,
    fontSize: 20,
    color: '#9e5143',
    fontFamily: 'arciform',
    marginBottom: 10,
    marginTop: 25,
    width: '50%',
  },
  hero_container: {
    width: '100%',
    // backgroundColor: 'white',
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  tutorial_1_copy: {
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    paddingRight: 15,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.1,
  },
  tutorial_2_copy: {
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    paddingRight: 15,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: -0.1,
    paddingLeft: 30,
  },
  picture_image_left: {
    width: '47.5%',
    height: 250,
    borderRadius: 10,
    marginRight: '2.5%',
    // margin: '5%'
  },
  picture_image_right: {
    width: '47.5%',
    height: 250,
    borderRadius: 10,
    marginLeft: '2.5%',
  },
  button_next: {
    backgroundColor: '#52875a',
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

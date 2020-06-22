import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Pot from '../../assets/pot_measure.svg';
import PotHeightSVG from '../../assets/tutorials/part_2/pot_measure.svg';
import LoopingInputLine from '../../utils/animations/LoopingInputLine';
import Arrow from '../../utils/animations/Arrow';
import { ScrollView } from 'react-native-gesture-handler';

function NewSnapshotPage(props) {
  const { image, plant_id, pot_height } = props.route.params;
  const [potHeight, setPotHeight] = useState(
    // 0,
    pot_height,
  );
  const [plantId, setPlantId] = useState(
    // 0,
    plant_id,
  );
  const { navigation } = props;

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.tutorial_heading}>new snapshot</Text>
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
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TextInput
              keyboardType="numeric"
              returnKeyType="done"
              value={potHeight}
              onChangeText={(height) => {
                setPotHeight(height);
              }}
              style={styles.input}
              placeholder={'___'}
              placeholderTextColor="#355a3a"
              maxLength={4}
            />

            <Text style={styles.cm_text}> cm</Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <LoopingInputLine></LoopingInputLine>
          </View>
        </View>

        <TouchableOpacity
          // disabled={true}
          onPress={() => {
            //const potHeightRounded = potHeight.toFixed(1);
            navigation.navigate('measure plant', {
              plantId,
              potHeight,
              image,
            });
          }}
          style={styles.button_all}
        >
          <Text style={styles.button_text_all}>measure</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
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
  input: {
    color: '#355a3a',
    fontSize: 50,
    textAlign: 'right',
    // marginTop: 20,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#52875a',
  },
  cm_text: {
    fontSize: 50,
    color: '#355a3a',
  },
  button_text_all: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  button_all: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    marginBottom: 25,
    marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
});

export default NewSnapshotPage;

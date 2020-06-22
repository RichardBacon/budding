import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Picker,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as api from '../../api-requests/api';
import RNPickerSelect from 'react-native-picker-select';
import * as Font from 'expo-font';
import LoadingGif from '../LoadingGif';

function EditPlant({ route, navigation }) {
  const { plant_id, plant, snapshots } = route.params;
  const { plant_uri } = snapshots[0];
  const [plantName, setPlantName] = useState(plant.plant_name);
  const [type, setType] = useState(plant.plant_type);
  const [variety, setVariety] = useState(plant.plant_variety);
  const [plantHeight, setPlantHeight] = useState(snapshots[0].height);
  const [potHeight, setPotHeight] = useState(plant.pot_height);
  const [waterFreq, setWaterFreq] = useState(plant.watering_freq);
  const [soil, setSoil] = useState(plant.soil);
  const [sunlight, setSunlight] = useState(plant.sunlight);
  const [location, setLocation] = useState(plant.location);
  const [loading, isLoading] = useState(false);
  const [fontLoading, loadFont] = useState(true);

  useEffect(() => {
    Font.loadAsync({
      arciform: require('../../assets/fonts/Arciform.otf'),
    }),
      loadFont(false);
  }, []);

  // plant info values have been passed down from plant page, and input fields default to these values
  // will change values when user inputs different info
  // sends PATCH request to our database, and navigates back to individual plant page

  const updatePlant = () => {
    isLoading(true);
    if (
      (plantName && plantName.length < 1) ||
      (variety && variety.length < 3)
    ) {
      Alert.alert(
        'Input field error',
        'Name must be between 1 and 25 characters, variety must be between 3 and 25 characters',
        [{ text: 'Got it' }],
      );
      isLoading(false);
      return;
    } else {
      api
        .patchPlantById(
          plant_id,
          plantName,
          type,
          soil,
          sunlight,
          location,
          waterFreq,
          variety,
          potHeight,
        )
        .then(({ status, plant }) => {
          if (status === 200) {
            const { plant_name } = plant;
            Alert.alert('Plant updated', `${plant_name} successfully updated!`);
            isLoading(false);
            navigation.navigate('garden');
          } else {
            Alert.alert(
              'Update failed',
              'Plant update failed. Please try again.',
            );
            isLoading(false);
          }
        })
        .catch((err) => {
          Alert.alert('Error', `${err}`);
          isLoading(false);
          console.log(err);
        });
    }
  };

  if (loading) return <LoadingGif />;
  else {
    return (
      <ScrollView>
        {!fontLoading && (
          <View>
            <View style={styles.container}>
              <Image
                style={styles.image}
                // onLoadEnd={() => isLoading(false)}
                source={{
                  uri: plant_uri,
                }}
              />
            </View>
            <View style={styles.header_text_container}>
              <Text style={styles.subHeadingText}>
                edit any plant info you'd like to change below:
              </Text>
              <Text style={styles.titleText}>{plantName}</Text>
            </View>

            <View style={styles.input_section_2}>
              <View style={styles.input_text_container}>
                <Text style={styles.input_text}>plant name: </Text>
              </View>
              <View style={styles.input_container}>
                <TextInput
                  onChangeText={(plantName) => {
                    setPlantName(plantName);
                  }}
                  style={styles.input}
                  placeholder={'e.g. Bell pepper'}
                  value={plantName}
                  maxLength={25}
                />
                <View style={styles.input_line}></View>
              </View>
            </View>

            <View style={styles.input_section_2}>
              <View style={styles.input_text_container}>
                <Text style={styles.input_text}>plant type:</Text>
              </View>
              <View style={styles.input_container}>
                <RNPickerSelect
                  onValueChange={(value) => setType(value)}
                  placeholder={{
                    label: 'select plant type',
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 20,
                      right: 10,
                    },
                    placeholder: {
                      color: 'white',
                      fontSize: 18,
                      fontWeight: '300',
                    },
                  }}
                  Icon={() => {
                    return (
                      <View
                        style={{
                          marginLeft: -70,
                          backgroundColor: 'transparent',
                          borderTopWidth: 10,
                          borderTopColor: 'white',
                          borderRightWidth: 10,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 10,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0,
                        }}
                      />
                    );
                  }}
                  items={[
                    { label: 'garden', value: 'garden' },
                    { label: 'vegetable', value: 'vegetable' },
                    { label: 'fruit', value: 'fruit' },
                    { label: 'herb', value: 'herb' },
                    { label: 'houseplant', value: 'houseplant' },
                    { label: 'succulent', value: 'succulent' },
                  ]}
                  value={type}
                />
              </View>
            </View>

            <View style={styles.input_section_2}>
              <View style={styles.input_text_container}>
                <Text style={styles.input_text}>variety: </Text>
              </View>
              <View style={styles.input_container}>
                <TextInput
                  onChangeText={(variety) => {
                    setVariety(variety);
                  }}
                  style={styles.input}
                  placeholder={'e.g. Bell pepper'}
                  value={variety}
                />
                <View style={styles.input_line}></View>
              </View>
            </View>

            <View style={styles.input_section_2}>
              <View style={styles.input_text_container}>
                <Text style={styles.input_text}>pot height:</Text>
              </View>
              <View style={styles.input_container}>
                <TextInput
                  onChangeText={(potHeight) => {
                    setPotHeight(potHeight);
                  }}
                  style={styles.input}
                  placeholder={'e.g. 10'}
                  value={potHeight}
                />
                <View style={styles.input_line}></View>
              </View>
            </View>

            <View style={styles.input_section_2}>
              <View style={styles.input_text_container}>
                <Text style={styles.input_text}>sunlight:</Text>
              </View>
              <View style={styles.input_container}>
                <RNPickerSelect
                  onValueChange={(value) => setSunlight(value)}
                  placeholder={{
                    label: 'select direct or indirect',
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 20,
                      right: 10,
                    },
                    placeholder: {
                      color: 'white',
                      fontSize: 18,
                      fontWeight: '300',
                    },
                  }}
                  Icon={() => {
                    return (
                      <View
                        style={{
                          marginLeft: -70,
                          backgroundColor: 'transparent',
                          borderTopWidth: 10,
                          borderTopColor: 'white',
                          borderRightWidth: 10,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 10,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0,
                        }}
                      />
                    );
                  }}
                  items={[
                    { label: 'indirect', value: 'indirect' },
                    { label: 'direct', value: 'direct' },
                  ]}
                  value={sunlight}
                />
              </View>
            </View>

            <View style={styles.input_section_2}>
              <View style={styles.input_text_container}>
                <Text style={styles.input_text}>location:</Text>
              </View>
            </View>
            <View style={styles.input_container}>
              <RNPickerSelect
                // style={pickerSelectStyles}
                // useNativeAndroidPickerStyle={false}
                onValueChange={(value) => setLocation(value)}
                placeholder={{
                  label: 'select indoor or outdoor',
                  // textAlign: 'centre',
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 20,
                    right: 10,
                  },
                  placeholder: {
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '300',
                    // textAlign: 'center',
                  },
                }}
                Icon={() => {
                  return (
                    <View
                      style={{
                        marginLeft: -70,
                        backgroundColor: 'transparent',
                        borderTopWidth: 10,
                        borderTopColor: 'white',
                        borderRightWidth: 10,
                        borderRightColor: 'transparent',
                        borderLeftWidth: 10,
                        borderLeftColor: 'transparent',
                        width: 0,
                        height: 0,
                      }}
                    />
                  );
                }}
                items={[
                  { label: 'indoor', value: 'indoor' },
                  { label: 'outdoor', value: 'outdoor' },
                ]}
                value={location}
              />
            </View>
            {/* </View> */}

            <View style={styles.input_section_2}>
              <View style={styles.input_text_container}>
                <Text style={styles.input_text}>
                  watering frequency:{' '}
                  <Text style={styles.optional}>optional</Text>
                </Text>
              </View>
              <View style={styles.input_container}>
                <TextInput
                  onChangeText={(freq) => {
                    setWaterFreq(freq);
                  }}
                  style={styles.input}
                  placeholder={'e.g. Once a week'}
                  value={waterFreq}
                />
              </View>
            </View>

            <View style={styles.input_section_2}>
              <View style={styles.input_text_container}>
                <Text style={styles.input_text}>
                  soil:<Text style={styles.optional}> optional</Text>
                </Text>
              </View>
              <View style={styles.input_container}>
                <TextInput
                  onChangeText={(soil) => {
                    setSoil(soil);
                  }}
                  style={styles.input}
                  placeholder={'e.g. Peat'}
                  value={soil}
                />
              </View>
            </View>

            <TouchableOpacity
              title={'update plant'}
              onPress={updatePlant}
              style={styles.button_all}
            >
              <Text style={styles.button_text_all}>update plant</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default EditPlant;

const styles = StyleSheet.create({
  container: {
    height: 400,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: '#355a3a',
    shadowOpacity: 3,
    elevation: 2,
    backgroundColor: '#355a3a',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    marginBottom: 40,
  },
  image: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  container2: {
    width: 450,
    height: 500,
  },
  // header_text_container: {
  //   height: 50,
  //   // margin: 50,
  // },
  titleText: {
    // height: 30,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
    color: '#355a3a',

    // lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'arciform',
  },
  subHeadingText: {
    // textAlign: 'center',
    // marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    // lineHeight: 24,
    color: '#355a3a',
    // width: '80%',
    paddingLeft: '5%',
    paddingRight: '5%',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'arciform',
  },
  input_section_2: {
    marginTop: 40,
  },
  input_container: {
    // padding: '5%',
    alignItems: 'center',
    alignContent: 'center',
  },
  input_text_container: {
    marginLeft: 51,
    marginBottom: 5,
  },
  input_text: {
    fontSize: 18,
    color: '#355a3a',
    fontWeight: '600',
  },
  input: {
    fontSize: 18,
    fontWeight: '300',
    color: '#355a3a',
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 5,
    // borderColor: 'green',
    backgroundColor: '#e6e6e6',
    // borderWidth: 1,
    // textDecorationLine: 'underline',
    width: '80%',
    height: 50,
  },
  input_line: {
    marginTop: -10,
    width: '75%',
    height: 1,
    backgroundColor: '#355a3a',
  },
  optional: {
    fontSize: 10,
    color: 'grey',
  },
  button: {
    color: 'green',
  },
  view: {
    flex: 1,
  },
  button_text_all: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  button_all: {
    backgroundColor: '#fdbe39',
    borderRadius: 5,
    marginBottom: 45,
    marginTop: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginLeft: 41,
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    borderStyle: 'solid',
    padding: 11,
    borderRadius: 5,
    // borderColor: 'green',
    backgroundColor: '#52875a',
    // borderWidth: 1,
    // textDecorationLine: 'underline',
    width: '80%',
    height: 50,
  },
  inputAndroid: {
    marginLeft: 37,
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    borderStyle: 'solid',
    padding: 11,
    borderRadius: 5,
    // borderColor: 'green',
    backgroundColor: '#52875a',
    // borderWidth: 1,
    // textDecorationLine: 'underline',
    width: '80%',
    height: 50,
  },
});

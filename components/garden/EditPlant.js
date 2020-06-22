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
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as api from '../../api-requests/api';
import RNPickerSelect from 'react-native-picker-select';
import * as Font from 'expo-font';

function EditPlant({ route, navigation }) {
  const { plant_id, plant, snapshots } = route.params;

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

  if (loading) return <ActivityIndicator />;
  else {
    return (
      <ScrollView>
        {!fontLoading && (
          <View style={styles.view}>
            <Text style={styles.subHeadingText}>
              enter any plant info you'd like to change below
            </Text>

            <Text style={styles.infoTitle}>plant name:</Text>

            <TextInput
              onChangeText={(plantName) => {
                setPlantName(plantName);
              }}
              style={styles.input}
              placeholder={'e.g. Plants Armstrong'}
              value={plantName}
            />

            <Text style={styles.infoTitle}>plant type:</Text>

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

            <Text style={styles.infoTitle}>variety: </Text>
            <TextInput
              onChangeText={(variety) => {
                setVariety(variety);
              }}
              style={styles.input}
              placeholder={'e.g. Bell pepper'}
              value={variety}
            />

            <Text style={styles.infoTitle}>pot height:</Text>
            <TextInput
              onChangeText={(potHeight) => {
                setPotHeight(potHeight);
              }}
              style={styles.input}
              placeholder={'e.g. 10'}
              value={potHeight}
            />
            <Text style={styles.infoTitle}>sunlight:</Text>

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

            <Text style={styles.infoTitle}>location:</Text>
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

            <Text style={styles.infoTitle}>
              watering frequency: <Text style={styles.optional}>optional</Text>
            </Text>
            <TextInput
              onChangeText={(freq) => {
                setWaterFreq(freq);
              }}
              style={styles.input}
              placeholder={'e.g. Once a week'}
              value={waterFreq}
            />

            <Text style={styles.infoTitle}>
              soil:<Text style={styles.optional}> optional</Text>
            </Text>
            <TextInput
              onChangeText={(soil) => {
                setSoil(soil);
              }}
              style={styles.input}
              placeholder={'e.g. Peat'}
              value={soil}
            />
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
  titleText: {
    height: 30,
    // marginTop: 10,
    marginBottom: 40,
    fontSize: 40,
    color: '#355a3a',

    // lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'arciform',
  },
  // logo: {
  //   width: 350,
  //   height: 450,
  // },
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
  autoSet: {
    fontSize: 18,
    fontWeight: '300',
    color: '#355a3a',
  },
  optional: {
    fontSize: 8,
    color: 'grey',
  },
  button: {
    color: 'green',
  },

  input_container: {
    // padding: '5%',
    //  width: '50vw',
    alignItems: 'center',
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
  view: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  subHeadingText: {
    // marginTop: 10,
    //marginBottom: 20,
    fontSize: 30,
    // lineHeight: 24,
    color: '#355a3a',
    textAlign: 'center',
    fontFamily: 'arciform',
  },
  infoTitle: {
    fontSize: 18,
    color: '#355a3a',
    fontWeight: 'bold',
    padding: 10,
    paddingTop: 30,
  },
  optional: {
    fontSize: 10,
    color: '#355a3a',
    fontWeight: 'bold',
    padding: 10,
    paddingTop: 30,
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
  button_text_all: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
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

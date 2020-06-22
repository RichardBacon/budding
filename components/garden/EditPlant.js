import React, { useState } from 'react';
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
} from 'react-native';
import * as api from '../../api-requests/api';
import RNPickerSelect from 'react-native-picker-select';

function EditPlant({ route, navigation }) {
  const [plantName, setPlantName] = useState(null);
  const [type, setType] = useState(null);
  const [variety, setVariety] = useState(null);
  const [potHeight, setPotHeight] = useState(null);
  const [waterFreq, setWaterFreq] = useState(null);
  const [soil, setSoil] = useState(null);
  const [sunlight, setSunlight] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, isLoading] = useState(false);

  const { plant_id } = route.params;

  //NEED TO TAKE PLANT ID OFF ROUTE PARAMS
  //IF WANT TO CHANGE SO INPUT FIELDS DEFAULT TO CURRENT INFO, NEED TO PASS DOWN PLANT INFO

  // loads input form which initially has all empty fields - user is only required to enter information for sections they want to update. The rest can be left blank.
  // sends PATCH request to our database, and navigates back to individual plant page (NEED TO SET THIS NAVIGATION UP)

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
        <View style={styles.view}>
          <Text style={styles.subHeadingText}>
            Input any information you'd like to change. You can leave any fields
            you do not wish to update blank.
          </Text>

          <Text>plant name:</Text>
          <TextInput
            onChangeText={(plantName) => {
              setPlantName(plantName);
            }}
            style={styles.input}
            placeholder={'e.g. Plants Armstrong'}
          />
          <Text>plant type:</Text>
          <View style={styles.input_container}>
            <RNPickerSelect
              // style={pickerSelectStyles}
              // useNativeAndroidPickerStyle={false}
              onValueChange={(value) => setSunlight(value)}
              placeholder={{
                label: 'select direct or indirect',
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
                { label: 'indirect', value: 'indirect' },
                { label: 'direct', value: 'direct' },
              ]}
            />
          </View>

          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => {
              setType(itemValue);
            }}
          >
            <Picker.Item label="" value={null} />
            <Picker.Item label="vegetable" value="vegetable" />
            <Picker.Item label="fruit" value="fruit" />
            <Picker.Item label="herb" value="herb" />
            <Picker.Item label="houseplant" value="houseplant" />
            <Picker.Item label="garden" value="garden" />
            <Picker.Item label="succulent" value="succulent" />
          </Picker>
          <Text>variety: </Text>
          <TextInput
            onChangeText={(variety) => {
              setVariety(variety);
            }}
            style={styles.input}
            placeholder={'e.g. bell pepper'}
          />
          <Text>plant height: 15cm</Text>
          <Text>pot height: {potHeight}10cm</Text>
          <TextInput
            onChangeText={(potHeight) => {
              setPotHeight(potHeight);
            }}
            style={styles.input}
            placeholder={'e.g. 10'}
          />
          <Text>sunlight:</Text>
          <Picker
            selectedValue={sunlight}
            onValueChange={(itemValue) => {
              setSunlight(itemValue);
            }}
          >
            <Picker.Item label="" value={null} />
            <Picker.Item label="indirect" value="indirect" />
            <Picker.Item label="direct" value="direct" />
          </Picker>
          <Text>location:</Text>
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => {
              setLocation(itemValue);
            }}
          >
            <Picker.Item label="" value={null} />
            <Picker.Item label="indoor" value="indoor" />
            <Picker.Item label="outdoor" value="outdoor" />
          </Picker>
          <Text>
            watering frequency: <Text style={styles.optional}>optional</Text>
          </Text>
          <TextInput
            onChangeText={(freq) => {
              setWaterFreq(freq);
            }}
            style={styles.input}
            placeholder={'e.g. once a week'}
          />

          <Text>
            soil:<Text style={styles.optional}>optional</Text>
          </Text>
          <TextInput
            onChangeText={(soil) => {
              setSoil(soil);
            }}
            style={styles.input}
            placeholder={'e.g. peat'}
          />
          <Button
            title={'update plant'}
            onPress={updatePlant}
            style={styles.button}
          />
        </View>
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
  optional: {
    fontSize: 8,
    color: 'grey',
  },
  button: {
    color: 'green',
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
  view: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  subHeadingText: {
    // marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    // lineHeight: 24,
    color: '#355a3a',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'arciform',
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
});

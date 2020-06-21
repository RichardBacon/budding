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
} from 'react-native';
import * as api from '../../api-requests/api';
const { options } = require('../../s3-config.js');
const shortid = require('shortid');
import { RNS3 } from 'react-native-s3-upload';
import RNPickerSelect from 'react-native-picker-select';

function NewPlantEntry({ route, navigation }) {
  const [plantName, setPlantName] = useState('');
  const [type, setType] = useState('vegetable');
  const [variety, setVariety] = useState('');
  const [waterFreq, setWaterFreq] = useState('');
  const [soil, setSoil] = useState('');
  const [sunlight, setSunlight] = useState('indirect');
  const [location, setLocation] = useState('indoor');
  const [loading, isLoading] = useState(false);

  // const { resizedImage, potHeight, plantHeight } = route.params;
  let plantId = '';

  // renders new plant form, everything but soil and water frequency required
  // upon pressing 'add new plant' button, sends POST request to our database
  // once our POST request is successful, uploads to s3 bucket
  // uses response from s3 which details the image location in the bucket
  // posts this image location to snapshots in our database
  // navigates to garden page after image is posted to snapshots

  const submitPlant = () => {
    if (plantName.length < 1 || variety.length < 3) {
      Alert.alert(
        'Input field error',
        'Name must be between 1 and 25 characters, variety must be between 3 and 25 characters',
        [{ text: 'Got it' }],
      );
      isLoading(false);
      return;
    } else {
      isLoading(true);
      const name = shortid.generate();

      const file = {
        // uri: resizedImage,
        name,
        type: 'image/jpg',
      };

      api
        .postPlant(
          1,
          plantName,
          type,
          soil,
          sunlight,
          location,
          waterFreq,
          variety,
          // potHeight,
        )
        .then((plant) => {
          plantId = plant.plant_id;
          return RNS3.put(file, options);
        })
        .then((response) => {
          console.log('status: ', response.status);
          if (response.status === 201) {
            console.log('body: ', response.body);
            const { postResponse } = response.body;
            return postResponse;
          } else {
            // stays on new plant page if there is an error and gives an alert
            Alert.alert('Error', 'Problem uploading photo. Please try again.');
            isLoading(false);
            console.log('error message: ', response.text);
          }
        })
        .then((postResponse) => {
          console.log('after s3 upload', postResponse);
          return api.postSnapshot(
            plantId,
            postResponse.location,
            // plantHeight
          );
        })
        .then(() => {
          console.log('before navigation');
          isLoading(false);
          setPlantName('');
          setType('vegetable');
          setVariety('');
          setWaterFreq('');
          setSoil('');
          setSunlight('indirect');
          setLocation('indoor');
          Alert.alert(
            'Plant added',
            'Great! You can now view your plant in your garden!',
          );
          navigation.navigate('new plant');
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
      // <View style={styles.view}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://cdn.discordapp.com/attachments/718422011516420147/719553678905704448/prayer-closeup.jpg',
            }}
          />
        </View>
        <Text style={styles.titleText}>{plantName}</Text>

        <View>
          <View style={styles.input_text_container}>
            <Text style={styles.input_text}>plant name:</Text>
          </View>
          <View style={styles.input_container}>
            <TextInput
              maxLength={25}
              onChangeText={(plantName) => {
                setPlantName(plantName);
              }}
              style={styles.input}
              placeholder={'e.g. Plants Armstrong'}
            ></TextInput>
            <View style={styles.input_line}></View>
          </View>
        </View>

        <View style={styles.input_section_2}>
          <View style={styles.input_text_container}>
            <Text style={styles.input_text}>plant type:</Text>
          </View>
          <View style={styles.input_container}>
            <RNPickerSelect
              // style={pickerSelectStyles}
              // useNativeAndroidPickerStyle={false}
              onValueChange={(value) => setType(value)}
              placeholder={{
                label: 'select a plant type',
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
                { label: 'garden', value: 'garden' },
                { label: 'vegetable', value: 'vegetable' },
                { label: 'fruit', value: 'fruit' },
                { label: 'herb', value: 'herb' },
                { label: 'houseplant', value: 'houseplant' },
                { label: 'succulent', value: 'succulent' },
              ]}
            />
          </View>
        </View>

        <View style={styles.input_section_2}>
          <View style={styles.input_text_container}>
            <Text style={styles.input_text}>variety:</Text>
          </View>
          <View style={styles.input_container}>
            <TextInput
              maxLength={25}
              onChangeText={(variety) => {
                setVariety(variety);
              }}
              style={styles.input}
              placeholder={'e.g. bell pepper'}
            ></TextInput>
            <View style={styles.input_line}></View>
          </View>
        </View>

        <Text>sunlight:</Text>
        <Picker
          selectedValue={sunlight}
          onValueChange={(itemValue) => {
            setSunlight(itemValue);
          }}
        >
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
          title={'add new plant'}
          onPress={submitPlant}
          style={styles.button}
        >
          add new plant
        </Button>
      </ScrollView>
      // </View>
    );
  }
}

export default NewPlantEntry;
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
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    fontSize: 8,
    color: 'grey',
  },
  button: {
    color: 'green',
  },
  view: {
    flex: 1,
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
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

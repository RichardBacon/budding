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

function NewPlantEntry({ route, navigation }) {
  const [plantName, setPlantName] = useState('');
  const [type, setType] = useState('vegetable');
  const [variety, setVariety] = useState('');
  const [waterFreq, setWaterFreq] = useState('');
  const [soil, setSoil] = useState('');
  const [sunlight, setSunlight] = useState('indirect');
  const [location, setLocation] = useState('indoor');
  const [loading, isLoading] = useState(false);

  const { resizedImage, potHeight, plantHeight } = route.params;
  let plantId = '';

  const submitPlant = () => {
    // POST request to postPlant
    // upload to s3 bucket
    // POST request to postSnapshot using plant_id received from postPlant
    // navigate to garden page AFTER has posted (.then)

    isLoading(true);

    //check plantName was minimum length 1
    //check variety minimum length 3
    if (plantName.length < 1 || variety.length < 3) {
      Alert.alert(
        'Input field error',
        'Name must be between 1 and 25 characters, variety must be between 3 and 25 characters',
        [{ text: 'Got it' }],
      );
      isLoading(false);
      return;
    } else {
      const name = shortid.generate();

      const file = {
        uri: resizedImage,
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
          potHeight,
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
            // navigates back to new plant page if there is an error
            Alert.alert('Error', 'Problem uploading photo. Please try again.');
            isLoading(false);
            console.log('error message: ', response.text);
            navigation.navigate('new plant');
          }
        })
        .then((postResponse) => {
          return api.postSnapshot(plantId, postResponse.location, plantHeight);
        })
        .then(() => {
          isLoading(false);
          setPlantName('');
          setType('vegetable');
          setVariety('');
          setWaterFreq('');
          setSoil('');
          setSunlight('indirect');
          setLocation('indoor');
          navigation.navigate('garden');
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
      <View style={styles.view}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            style={styles.logo}
            source={{
              uri: resizedImage,
            }}
          />
          <Text style={styles.titleText}>{plantName}</Text>

          <Text>plant name:</Text>
          <TextInput
            maxLength={25}
            onChangeText={(plantName) => {
              setPlantName(plantName);
            }}
            style={styles.input}
            placeholder={'e.g. Plants Armstrong'}
          />
          <Text>plant type:</Text>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => {
              setType(itemValue);
            }}
          >
            <Picker.Item label="vegetable" value="vegetable" />
            <Picker.Item label="fruit" value="fruit" />
            <Picker.Item label="herb" value="herb" />
            <Picker.Item label="houseplant" value="houseplant" />
            <Picker.Item label="garden" value="garden" />
            <Picker.Item label="succulent" value="succulent" />
          </Picker>
          <Text>variety: </Text>
          <TextInput
            maxLength={25}
            onChangeText={(variety) => {
              setVariety(variety);
            }}
            style={styles.input}
            placeholder={'e.g. bell pepper'}
          />
          <Text>plant height: {plantHeight}cm</Text>
          <Text>pot height: {potHeight}cm</Text>
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
      </View>
    );
  }
}

export default NewPlantEntry;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  logo: {
    width: 350,
    height: 450,
  },
  input: {
    borderStyle: 'solid',
    borderColor: 'green',
    borderWidth: 1,
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

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

  const { image, potHeight, plantHeight } = route.params;

  let plantId = '';

  const submitPlant = () => {
    // POST request to postPlant
    // upload to s3 bucket
    // POST reques to postSnapshot using plant_id received from postPlant
    // navigate to garden page AFTER has posted (.then)
    console.log('inside submit plant');
    const name = shortid.generate();

    const file = {
      uri: image,
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
          console.log('error message: ', response.text);
          navigation.navigate('new plant');
          // navigates back to new plant page if there is an error
        }
      })
      .then((postResponse) => {
        return api.postSnapshot(plantId, postResponse.location, plantHeight);
      })
      .then((response) => {
        navigation.navigate('garden');
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.view}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.titleText}>{plantName}</Text>

        <Text>plant name:</Text>
        <TextInput
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

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import * as api from '../../api-requests/api';

function EditPlant({ route, navigation }) {
  const [plantName, setPlantName] = useState('');
  const [type, setType] = useState('');
  const [variety, setVariety] = useState('');
  const [waterFreq, setWaterFreq] = useState('');
  const [soil, setSoil] = useState('');
  const [sunlight, setSunlight] = useState('indirect');
  const [location, setLocation] = useState('indoor');

  //NEED TO TAKE PLANT ID AND CURRENT VALUES OFF OFF ROUTE.PARAMS, USE THESE TO SET STATE

  const updatePlant = () => {
    api
      .patchPlantById(
        plantName,
        type,
        soil,
        sunlight,
        location,
        waterFreq,
        variety,
      )
      .then(() => {
        navigation.navigate(''); // NAVIGATE TO INDIVIDUAL PLANT PAGE
      }); // HAVEN'T ADDED POT HEIGHT LIKE IT SAYS IN PATCH REQUEST
  };

  return (
    <View styles={styles.view}>
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
        onPress={updatePlant}
        style={styles.button}
      >
        update plant
      </Button>
    </View>
  );
}

export default EditPlant;

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

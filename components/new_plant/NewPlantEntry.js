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
import { Picker } from '@react-native-community/picker';

function NewPlantEntry(plantInfo) {
  const [name, setName] = useState('');
  const [type, setType] = useState('vegetable');
  const [variety, setVariety] = useState('');
  const [waterFreq, setWaterFreq] = useState('');
  const [soil, setSoil] = useState('');
  const [sunlight, setSunlight] = useState('indirect');
  const [location, setLocation] = useState('indoors');
  const [leaves, setLeaves] = useState(null);

  const { params } = plantInfo.route;
  const submitPlant = () => {
    const name = shortid.generate();
    console.log(image);

    const file = {
      uri: image,
      name,
      type: 'image/jpg',
    };

    RNS3.put(file, options)
      .then((response) => {
        console.log('status: ', response.status);
        if (response.status === 201) {
          console.log('body: ', response.body);
          const { location } = response.body.postResponse;
          const plantInfo = {
            image,
            location,
            height,
            potHeight: 12.5,
          };
          navigation.navigate('new plant entry', plantInfo);
        } else console.log('message: ', response.text);
      })
      .catch((err) => console.log(err));
    //setImage(null);
  };
  return (
    <View style={styles.view}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: params.image,
          }}
        />
        <Text style={styles.titleText}>{name}</Text>

        <Text>plant name:</Text>
        <TextInput
          onChangeText={(name) => {
            setName(name);
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
          <Picker.Item label="houseplant" value="houseplant" />
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
        <Text>plant height: {params.plantHeight}cm</Text>
        <Text>pot height: {params.potHeight}cm</Text>
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
          <Picker.Item label="indoors" value="indoors" />
          <Picker.Item label="outdoors" value="outdoors" />
        </Picker>
        <Text>
          number of leaves: <Text style={styles.optional}>optional</Text>
        </Text>
        <TextInput
          onChangeText={(leaves) => {
            setLeaves(leaves);
          }}
          style={styles.input}
          placeholder={'must be a number'}
        />
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
          onPress={() => console.log('add new plant')}
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

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button
} from 'react-native';
import * as api from '../../api-requests/api';

function EditPlant() {
  return (
    <View styles={styles.view}>
      <Text>edit plant</Text></View>
      <Text>name: </Text>
       <Text>variety: </Text>
       <Text>soil: </Text>
       <Text>sunlight: </Text>
        <Text>location: </Text>
        
  )
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

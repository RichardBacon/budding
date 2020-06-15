import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';

// navigation

function NewPlantHome(props) {
  const { navigation } = props;
  const {
    launchCameraAsync,
    openImagePickerAsync,
    selectedImage,
    imagePickerSelected,
  } = props.route.params;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: selectedImage.localUri,
        }}
        style={styles.thumbnail}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('measure plant', {
            image: selectedImage.localUri,
          })
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>use photo</Text>
      </TouchableOpacity>

      {imagePickerSelected && (
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>choose another photo</Text>
        </TouchableOpacity>
      )}

      {imagePickerSelected || (
        <TouchableOpacity onPress={launchCameraAsync} style={styles.button}>
          <Text style={styles.buttonText}>choose another photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'stretch',
  },
});

export default NewPlantHome;

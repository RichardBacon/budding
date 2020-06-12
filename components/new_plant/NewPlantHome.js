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
import * as ImagePicker from 'expo-image-picker';
// import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import logo from '../../assets/logo.png';

function NewPlantHome({ navigation }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePickerSelected, setPickerSelected] = React.useState(true);

  let launchCameraAsync = async () => {
    setPickerSelected(false);
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
  };

  let openImagePickerAsync = async () => {
    navigation.navigate('new plant');
    setPickerSelected(true);
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
      imagePickerScreen();
    }
  };

  imagePickerScreen = () => {
    navigation.navigate('image picker', {
      selectedImage: selectedImage,
      openImagePickerAsync: openImagePickerAsync,
      launchCameraAsync: launchCameraAsync,
      imagePickerSelected: imagePickerSelected,
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('tutorial', {
            openImagePickerAsync: openImagePickerAsync,
          })
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>tutorial</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>pick from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={launchCameraAsync} style={styles.button}>
        <Text style={styles.buttonText}>Take a photo!</Text>
      </TouchableOpacity>
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

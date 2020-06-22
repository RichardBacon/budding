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
  ScrollView,
} from 'react-native';

// navigation

function ImagePickerScreen(props) {
  const { navigation } = props;
  const {
    plantId,
    potHeight,
    launchCameraAsync,
    openImagePickerAsync,
    selectedImage,
    imagePickerSelected,
    userId,
  } = props.route.params;
  return (
    // <ScrollView>
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image
          source={{
            uri: selectedImage.localUri,
          }}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={styles.button_next}
        onPress={() =>
          navigation.navigate('new snapshot', {
            image: selectedImage.localUri,
            pot_height: potHeight,
            plant_id: plantId,
            userId,
          })
        }
      >
        <Text style={styles.button_text_step_2}>use photo</Text>
      </TouchableOpacity>

      {imagePickerSelected && (
        <TouchableOpacity
          style={styles.button_back}
          onPress={openImagePickerAsync}
        >
          <Text style={styles.button_text_back}>choose another photo</Text>
        </TouchableOpacity>
      )}

      {imagePickerSelected || (
        <TouchableOpacity
          style={styles.button_back}
          onPress={launchCameraAsync}
        >
          <Text style={styles.button_text_back}>choose another photo</Text>
        </TouchableOpacity>
      )}
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
    height: 350,
    resizeMode: 'stretch',
  },
  image_container: {
    height: '50%',
    width: '80%',
    // shadowOffset: { width: 1, height: 3 },
    // shadowColor: '#355a3a',
    // shadowOpacity: 3,
    // elevation: 2,
    backgroundColor: '#355a3a',
    borderRadius: 10,
    // borderBottomRightRadius: 50,
    // borderTopLeftRadius: 50,
    marginBottom: 10,
    // backgroundColor: 'black',
  },
  image: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  button_next: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    // marginBottom: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  button_text_step_2: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_text_back: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
    color: '#52875a',
  },
  button_back: {
    // backgroundColor: '#52875a',
    borderRadius: 5,
    marginBottom: 20,
    // marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
});

export default ImagePickerScreen;

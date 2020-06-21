import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import * as api from '../api-requests/api';
import * as Font from 'expo-font';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [signingUp, setSignUp] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  let ScreenHeight = Dimensions.get('window').height;

  useEffect(() => {
    Font.loadAsync({
      arciform: require('../assets/fonts/Arciform.otf'),
      helvetica: require('../assets/fonts/HelveticaNeueLTCom-Roman.ttf'),
    }).then(() => {
      setLoading(false);
    });
  }, []);

  const getUserData = () => {
    if (username.length < 4) {
      Alert.alert(
        'Input field error',
        'Username must be 4 or more characters',
        [{ text: 'Got it' }],
      );
      setLoading(false);
      return;
    } else {
      setLoading(true);

      api
        .getUserByUsername(username)
        .then(({ user_id, username, name }) => {
          //setLoading(false);
          props.logIn(user_id, username, name);
        })
        .catch((err) => {
          Alert.alert('Error', `Username not found`);
          setLoading(false);
          console.log(err);
        });
    }
  };

  const createUser = () => {
    if (newUsername.length < 4 || newName.length < 4) {
      Alert.alert(
        'Input field error',
        'Username must be 4 or more characters, name must be between 4 and 25 characters',
        [{ text: 'Got it' }],
      );
      setLoading(false);
      return;
    } else {
      setLoading(true);

      api
        .postUser(newUsername, newName)
        .then(({ username }) => {
          return api.getUserByUsername(username);
        })
        .then((user) => {
          //setLoading(false);
          props.logIn(user.user_id);
        })
        .catch((err) => {
          Alert.alert('Error', `${err}`);
          setLoading(false);
          console.log(err);
        });
    }
  };

  // displays login and sign up option
  // when sign up button pressed, displays input boxes and a submit button, which then posts the new user info and immediately logs them in, taking them to garden page

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: ScreenHeight,
          backgroundColor: 'white',
        }}
      >
        <Image
          style={{ width: 100, height: 100, backgroundColor: 'white' }}
          source={require('../assets/gifs/Shifter_V01.gif')}
        />
      </View>
    );
  else
    return (
      <View style={styles.centered_view}>
        <Text style={styles.title}>budding</Text>

        <View style={styles.middle_buttons}>
          {!loggingIn && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setLoggingIn(true)}
            >
              <Text style={styles.button_text}>login</Text>
            </TouchableOpacity>
          )}
          {loggingIn && (
            <TextInput
              textAlign={'center'}
              onChangeText={(username) => {
                setUsername(username);
              }}
              style={styles.input}
              placeholder={'username'}
            />
          )}
          {loggingIn && (
            <TouchableOpacity style={styles.button} onPress={getUserData}>
              <Text style={styles.button_text}>login</Text>
            </TouchableOpacity>
          )}

          <View>
            {!signingUp && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setSignUp(true)}
              >
                <Text style={styles.button_text}>sign up</Text>
              </TouchableOpacity>
            )}
            {signingUp && (
              <TextInput
                textAlign={'center'}
                onChangeText={(newUsername) => {
                  setNewUsername(newUsername);
                }}
                style={styles.input}
                placeholder={'new username'}
              />
            )}
            {signingUp && (
              <TextInput
                textAlign={'center'}
                onChangeText={(newName) => {
                  setNewName(newName);
                }}
                style={styles.input}
                placeholder={'full name'}
                maxLength={25}
              />
            )}
            {signingUp && (
              <TouchableOpacity style={styles.button} onPress={createUser}>
                <Text style={styles.button_text}>submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.bottom_text}>
          Track your seeds as they grow and watch them thrive!
        </Text>
      </View>
    );
};

export default Login;

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#52875a',
  },
  title: {
    fontFamily: 'arciform',
    fontSize: 50,
    color: 'white',
  },
  middle_buttons: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    color: '#52875a',
    padding: 20,
    borderRadius: 5,
    paddingVertical: 7,
    marginBottom: 10,
    paddingHorizontal: 80,
  },
  input: { fontFamily: 'helvetica', color: 'white', fontSize: 20 },
  button_text: {
    fontSize: 20,
    color: '#52875a',
    textAlign: 'center',
    fontFamily: 'arciform',
  },
  bottom_text: {
    fontFamily: 'helvetica',
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    paddingBottom: 40,
    marginHorizontal: 30,
  },
});

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as api from '../api-requests/api';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [signingUp, setSignUp] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');

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

  if (loading) return <ActivityIndicator />;
  else
    return (
      <View style={styles.centeredView}>
        <Text>Login Page</Text>
        <TextInput
          onChangeText={(username) => {
            setUsername(username);
          }}
          style={styles.input}
          placeholder={'username'}
        />
        <Button title="Login" onPress={getUserData} />
        <Text>Not got an account? Sign up here</Text>
        {!signingUp && (
          <Button title="Sign up" onPress={() => setSignUp(true)} />
        )}
        {signingUp && (
          <TextInput
            onChangeText={(newUsername) => {
              setNewUsername(newUsername);
            }}
            style={styles.input}
            placeholder={'new username'}
          />
        )}
        {signingUp && (
          <TextInput
            onChangeText={(newName) => {
              setNewName(newName);
            }}
            style={styles.input}
            placeholder={'full name'}
            maxLength={25}
          />
        )}
        {signingUp && <Button title="submit" onPress={createUser} />}
      </View>
    );
};

export default Login;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

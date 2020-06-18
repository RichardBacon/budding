import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as api from '../api-requests/api';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const getUserData = () => {
    setLoading(true);

    if (username.length < 4) {
      Alert.alert(
        'Input field error',
        'Username must be 4 or more characters',
        [{ text: 'Got it' }],
      );
      setLoading(false);
      return;
    } else {
      api
        .getUserByUsername(username)
        .then((user) => {
          setLoading(false);
          props.logIn(user.user_id, '<--- response');
        })
        .catch((err) => {
          Alert.alert('Error', `Username not found`);
          setLoading(false);
          console.log(err);
        });
    }
  };

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
        <Button
          title="Login"
          onPress={
            getUserData
            // send request to getuser
            // if response is successful, setsmodalVisible to false
            //setModalVisible(true);
            // navigation.navigate('garden');
          }
        />
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

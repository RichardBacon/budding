import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Modal } from 'react-native';

const Login = (props) => {
  return (
    <View style={styles.centeredView}>
      <Text>Login Page</Text>
      <Button
        title="Login"
        onPress={() => {
          props.logIn({ user_id: 1, username: 'robert_plant' });
          // send request to getuser
          // if response is successful, setsmodalVisible to false
          //setModalVisible(true);
          // navigation.navigate('garden');
        }}
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

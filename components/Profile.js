import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

function Profile({ navigation, userInfo, logOut }) {
  useEffect(() => {
    Font.loadAsync({
      arciform: require('../assets/fonts/Arciform.otf'),
      helvetica: require('../assets/fonts/HelveticaNeueLTCom-Roman.ttf'),
    });
  }, []);

  const { name, username } = userInfo;
  return (
    <View style={styles.container}>
      <Text style={styles.profile_text}>profile</Text>
      <View style={styles.user_card}>
        <Text style={styles.user_info}>username</Text>
        <Text style={styles.user_info_value}>{username}</Text>
        <Text style={styles.user_info}>grower name</Text>
        <Text style={styles.user_info_value}>{name}</Text>

        <TouchableOpacity style={styles.button} onPress={logOut}>
          <Text style={styles.button_text}>log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  profile_text: {
    fontFamily: 'arciform',
    fontSize: 50,
    color: '#355a3a',
    marginTop: '25%',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  user_card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  user_info: {
    fontWeight: '600',
    fontSize: 20,
    color: '#52875a',
    textAlign: 'center',
  },
  user_info_value: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#355a3a',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#52875a',
    color: '#52875a',
    padding: 20,
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
    width: '65%',
    // paddingHorizontal: 80,
  },
  button_text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'arciform',
  },
});

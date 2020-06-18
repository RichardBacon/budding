import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Profile({ navigation, userInfo, logOut }) {
  const { name, username } = userInfo;
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>username: {username}</Text>
      <Text>name: {name}</Text>
      <Button title="log out" onPress={logOut} />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

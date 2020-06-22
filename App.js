// import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import PlantOptionsNavigator from './components/new_plant/PlantOptionsNavigator';
import GardenNavigator from './components/garden/GardenNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import Profile from './components/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Entypo, Foundation, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// set all states to null to engage the login page

function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  // const [userId, setUserId] = useState(1);
  // const [username, setUsername] = useState('robert_plant');
  const [name, setName] = useState(null);
  // to undo hardcode, set state back to id null and useState ''

  const logIn = (Id, user, fullName) => {
    setUserId(Id);
    setUsername(user);
    setName(fullName);
  };

  const logOut = () => {
    setUserId(null);
    Alert.alert('Logged out', 'See you soon - in the meantime, keep growing!');
  };

  const userInfo = {
    userId,
    username,
    name,
  };

  // if user isn't logged in, displays login component
  // if user is logged in, navigates to garden page, passing userId down through garden navigator

  return (
    <>
      {!userId && <Login logIn={logIn} />}
      {userId && (
        <>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  // size = 40;
                  if (route.name === 'garden') {
                    return <Entypo name="tree" size={size} color={color} />;
                  } else if (route.name === 'new plant') {
                    return (
                      <Entypo
                        // style={{ marginBottom: 2 }}
                        name={'plus'}
                        size={size}
                        color={color}
                      />
                    );
                  } else if (route.name === 'profile') {
                    return <AntDesign name="user" size={size} color={color} />;
                  }
                  // You can return any component that you like here!
                },
              })}
              tabBarOptions={{
                inactiveTintColor: '#52875a',
                activeTintColor: 'white',
                style: styles.bottomNav,
              }}
            >
              <Tab.Screen name="garden">
                {(navigation) => (
                  <GardenNavigator {...navigation} userId={userId} />
                )}
              </Tab.Screen>
              <Tab.Screen name="new plant" component={PlantOptionsNavigator} />
              <Tab.Screen name="profile">
                {(navigation) => (
                  <Profile
                    {...navigation}
                    userInfo={userInfo}
                    logOut={logOut}
                  />
                )}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    paddingTop: 10,
    backgroundColor: '#355a3a',
    color: 'white',
  },
  userName: {
    marginTop: 50,
  },
});

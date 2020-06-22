// import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import PlantOptionsNavigator from './components/new_plant/PlantOptionsNavigator';
import GardenNavigator from './components/garden/GardenNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './components/Login';
import Profile from './components/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';

import GardenIcon from './assets/icons/garden_icon.svg';

const Tab = createBottomTabNavigator();

// set all states to null to engage the login page

function App() {
  const [userId, setUserId] = useState(1);
  const [username, setUsername] = useState('robert_plant');
  const [name, setName] = useState(null);
  // to undo hardcode, set state back to id null and useState ''

  const logIn = (Id, user, fullName) => {
    setUserId(Id);
    setUsername(user);
    setName(fullName);
  };

  const logOut = () => {
    setUserId(null);
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

                  if (route.name === 'garden') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'garden') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                  }

                  // You can return any component that you like here!
                  return (
                    <GardenIcon
                      // name={iconName}
                      width={20}
                      height={20}
                      // size={40}
                      color={'white'}
                    ></GardenIcon>
                  );
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
              tabBarOptions={{
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
    backgroundColor: '#355a3a',
    color: 'white',
  },
  userName: {
    marginTop: 50,
  },
});

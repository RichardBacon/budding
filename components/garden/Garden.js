import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  SafeAreaView,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { SearchBar } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import * as api from '../../api-requests/api';
import * as svg from 'react-native-svg';
import Plant from '../../assets/plant.svg';

function Garden({ navigation }) {
  const [plants, setPlants] = useState([
    {
      // plant data
      plant_id: 4,
      plant_name: 'plantName4',
      created_at: '2018-11-15T12:21:54.173Z',
      snapshot_count: '2',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      plant_id: 4,
      plant_name: 'plantName4',
      snapshot_count: '6',
      created_at: '2014-11-16T12:21:54.171Z',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      // plant data
      plant_id: 4,
      plant_name: 'plantName4',
      created_at: '2018-11-15T12:21:54.173Z',
      snapshot_count: '2',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      plant_id: 4,
      plant_name: 'plantName4',
      snapshot_count: '6',
      created_at: '2014-11-16T12:21:54.171Z',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      // plant data
      plant_id: 4,
      plant_name: 'plantName4',
      created_at: '2018-11-15T12:21:54.173Z',
      snapshot_count: '2',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      plant_id: 4,
      plant_name: 'plantName4',
      snapshot_count: '6',
      created_at: '2014-11-16T12:21:54.171Z',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      // plant data
      plant_id: 4,
      plant_name: 'plantName4',
      created_at: '2018-11-15T12:21:54.173Z',
      snapshot_count: '2',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      plant_id: 4,
      plant_name: 'plantName4',
      snapshot_count: '6',
      created_at: '2014-11-16T12:21:54.171Z',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      // plant data
      plant_id: 4,
      plant_name: 'plantName4',
      created_at: '2018-11-15T12:21:54.173Z',
      snapshot_count: '2',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      plant_id: 4,
      plant_name: 'plantName4',
      snapshot_count: '6',
      created_at: '2014-11-16T12:21:54.171Z',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      // plant data
      plant_id: 4,
      plant_name: 'plantName4',
      created_at: '2018-11-15T12:21:54.173Z',
      snapshot_count: '2',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
    {
      plant_id: 4,
      plant_name: 'plantName4',
      snapshot_count: '6',
      created_at: '2014-11-16T12:21:54.171Z',
      snapshot_id: 1,
      // snapshot data
      uri:
        'https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png',
      no_leaves: 4,
      snapshot_id: 1,
      height: 10,
    },
  ]);
  const [selectedValue, setSelectedValue] = useState('uk');
  const [snapshots, setSnapshots] = useState();

  //  <Logo width={120} height={40} />

  // useEffect(() => {
  //   api.getPlantsByUserId(1).then((plants) => {
  //     const { name } = plants;
  //     setPlants(plants);
  //   });
  // });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Plant width={120} height={40} fill="green" />
      <Text>My Garden</Text>
      <SearchBar placeholder="search-plants" value={'plants'} />
      <View style={styles.heroContainer}>
        <DropDownPicker
          items={[
            { label: 'UK', value: 'uk' },
            { label: 'France', value: 'france' },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 40 }}
          style={styles.dropDown}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSelectedValue(item)}
        />
        <DropDownPicker
          items={[
            { label: 'UK', value: 'uk' },
            { label: 'France', value: 'france' },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 40 }}
          style={styles.dropDown}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSelectedValue(item)}
        />
        <DropDownPicker
          items={[
            { label: 'UK', value: 'uk' },
            { label: 'France', value: 'france' },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 40 }}
          style={styles.dropDown}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSelectedValue(item)}
        />
      </View>
      <View style={styles.container}>
        <FlatGrid
          itemDimension={130}
          data={plants}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <View>
              <View style={styles.plantContainer}>
                <Image source={{ uri: item.uri }} style={styles.image}></Image>
              </View>
              <View style={styles.plant_view}>
                <View style={styles.plant_left_view}>
                  <Text style={styles.plantName}>{item.plant_name}</Text>
                  <Text style={styles.plantStats}>{item.height}</Text>
                  <Text style={styles.plantStats}>{item.no_leaves}</Text>
                </View>
                <View style={styles.plant_right_view}>
                  <Text style={styles.plantStats}>{item.no_leaves}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  heroContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 2,
  },
  container: {
    flex: 2,
    zIndex: 1,
  },
  dropDown: {
    width: 75,
  },
  plantContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 250,
    borderColor: '#52875a',
    borderWidth: 1,
  },
  plant_view: {
    flexDirection: 'row',
  },
  plant_left_view: {
    flex: 2,
  },
  plant_right_view: {
    textAlign: 'right',
  },
  plantName: {
    fontSize: 16,
    color: '#52875a',
    fontWeight: '900',
  },
  plantStats: {
    fontWeight: '600',
    fontSize: 12,
    color: '#52875a',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  logo: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Garden;

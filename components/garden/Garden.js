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
  TouchableOpacity,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { SearchBar } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import * as api from '../../api-requests/api';
import * as svg from 'react-native-svg';
import Plant from '../../assets/plant.svg';
import GlobalStyles from '../../styles/GlobalStyles';
import { makeRefObj, formatArray } from '../../utils/utils';

function Garden() {
  const [selectedValue, setSelectedValue] = useState('uk');
  const [snaps, setSnaps] = useState([
    {
      created_at: '2014-11-16T12:21:54.171Z',
      height: 10,
      no_leaves: 4,
      plant_id: 8,
      plant_uri:
        'https://cdn.discordapp.com/attachments/718422373522735155/722409976949375046/image0.jpg',
      snapshot_id: 11,
      plant_name: 'plantName8',
      snapshot_count: '1',
    },
  ]);

  // an array displaying plant cards containing plant name, uri, height, snapshot count, most recent snapshot (most recent entry)
  useEffect(() => {
    const user_id = 1;
    let arr = []; // [{}, {}]
    api.getPlantsByUserId(user_id).then((plants) => {
      // console.log(plants);
      const snapsArr = plants.map((plant) => {
        const { plant_id, plant_name, snapshot_count } = plant;
        return api.getSnapshotsByPlantId(plant_id).then((snap) => {
          // console.log(snaps);
          // [{}, {}]
          let newObj = { plant_name, snapshot_count, ...snap[0] };
          let newArr = [];
          newArr.push(newObj);
          // console.log(newObj);
          // console.log(newObj, '<--- obj');
          // arr.push(newObj);
        });
      });
      console.log(snapsArr);
    });
  }, []);

  // current plant object

  // {
  //   "created_at": "2014-11-10T17:28:34.171Z",
  //   "location": "inside",
  //   "plant_id": 2,
  //   "plant_name": "plantName2",
  //   "plant_type": "vegetable",
  //   "plant_variety": "tomato",
  //   "pot_height": "10.00",
  //   "snapshot_count": "2",
  //   "soil": "soil1",
  //   "sunlight": "indirect",
  //   "user_id": 1,
  //   "watering_freq": "twice a day",
  // }

  // current snapshot object

  // {
  //   created_at: '2014-11-16T12:21:54.171Z',
  //   height: 10,
  //   no_leaves: 4,
  //   plant_id: 6,
  //   plant_uri: 'https://cdn.discordapp.com/attachments/718422373522735155/722409976949375046/image0.jpg',
  //   snapshot_id: 9,
  // }

  // result we want

  // {
  //   created_at: '2014-11-16T12:21:54.171Z',
  //   height: 10,
  //   no_leaves: 4,
  //   plant_id: 6,
  //   plant_uri: 'https://cdn.discordapp.com/attachments/718422373522735155/722409976949375046/image0.jpg',
  //   snapshot_id: 9,
  //   snapshot_count: 4,
  //   plant_name: 'missPlant'
  // }

  // const queries = [api.getSnapshotsByPlantId(plant_id)];
  // Promise.all(queries).then((snap) => {
  //   console.log(snap);
  // });

  return (
    <SafeAreaView style={[GlobalStyles.droidSafeArea, { flex: 1 }]}>
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
          data={snaps}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <View>
              <View style={styles.plantContainer}>
                <TouchableOpacity style={styles.image}>
                  <View>
                    <Text></Text>
                  </View>
                  <Image
                    source={{ uri: item.plant_uri }}
                    style={styles.image}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('tutorial', {
                      openImagePickerAsync: openImagePickerAsync,
                    })
                  }
                >
                  <Image
                    source={{ uri: item.plant_uri }}
                    style={styles.image}
                  ></Image>
                </TouchableOpacity> */}
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

//  <Logo width={120} height={40} />

// function joinPlantProperties(plants, snap) {
//   const newObj = {};
//   plants.forEach((plant) => {
//     if (plant.plant_id === snap.plant_id) {
//       newObj.name = plants.plant_name;
//     }
//     console.log(newObj);
//   });
// }

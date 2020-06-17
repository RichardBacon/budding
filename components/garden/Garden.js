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
  ActivityIndicator,
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
  const [selectedValue, setSelectedValue] = useState('desc');
  const [snaps, setSnaps] = useState([]);
  const [loading, isLoading] = useState(true);
  const [order, changeOrder] = useState('desc');

  // an array displaying plant cards containing plant name, uri, height, snapshot count, most recent snapshot (most recent entry)
  useEffect(() => {
    const user_id = 1;
    const { value } = order;
    api.getPlantsByUserId(user_id, value).then((plants) => {
      const snapShotArr = plants.map((plant) => {
        const { plant_id, plant_name, snapshot_count } = plant;
        return api.getSnapshotsByPlantId(plant_id).then((snap) => {
          let newObj = { plant_name, snapshot_count, ...snap[0] };
          let newArr = [];
          newArr.push(newObj);
          return newArr;
        });
      });
      Promise.all(snapShotArr).then((snapshots) => {
        const newObj = snapshots.flat();
        setSnaps(newObj);
      });
    });
  }, [order]);

  // if (loading)
  //   return (
  //     <View style={[styles.container, styles.horizontal]}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <ActivityIndicator size="small" color="#00ff00" />
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <ActivityIndicator size="small" color="#00ff00" />
  //     </View>
  //   );

  return (
    <SafeAreaView style={[GlobalStyles.droidSafeArea, { flex: 1 }]}>
      <Plant width={120} height={40} fill="green" />
      <Text>My Garden</Text>
      {/* <SearchBar placeholder="search-plants" value={'plants'} /> */}
      <View style={styles.heroContainer}>
        <DropDownPicker
          items={[
            { label: 'New', value: 'desc' },
            { label: 'Old', value: 'asc' },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 40 }}
          style={styles.dropDown}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => changeOrder(item)}
        />
        <DropDownPicker
          items={[
            { label: 'New', value: 'desc' },
            { label: 'Old', value: 'desc' },
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
                  <View></View>
                  <Image
                    source={{ uri: item.plant_uri }}
                    style={styles.image}
                    onLoad={isLoading(false)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.plant_view}>
                <View style={styles.plant_left_view}>
                  <Text style={styles.plantName}>{item.plant_name}</Text>
                  <Text style={styles.plantStats}>{item.height}</Text>
                </View>
                <View style={styles.plant_right_view}>
                  <Text style={styles.plantStats}>{item.snapshot_count}</Text>
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

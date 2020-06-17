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
  const [sort_by, changeSort] = useState('created_at');
  const [snaps, setSnaps] = useState([]);
  const [loading, isLoading] = useState(true);
  const [order, changeOrder] = useState('desc');

  // an array displaying plant cards containing plant name, uri, height, snapshot count, most recent snapshot (most recent entry)
  useEffect(() => {
    const user_id = 1;
    console.log(order);
    console.log(sort_by);
    api.getPlantsByUserId(user_id, order, sort_by).then((plants) => {
      const snapShotArr = plants.map((plant) => {
        const { plant_id, plant_name, snapshot_count } = plant;
        return api.getSnapshotsByPlantId(plant_id).then((snap) => {
          return { plant_name, snapshot_count, ...snap[0] };
        });
      });
      Promise.all(snapShotArr).then((snapshots) => {
        setSnaps(snapshots);
      });
    });
  }, [order, sort_by]);

  // if (loading)
  //   return (
  //     <View style={[styles.container, styles.horizontal]}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <ActivityIndicator size="small" color="#00ff00" />
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <ActivityIndicator size="small" color="#00ff00" />
  //     </View>
  //   );

  const toggleSortBy = (data) => {
    if (data === 'most snaps') {
      changeOrder('desc');
      changeSort('snapshot_count');
    }
    if (data === 'least snaps') {
      changeOrder('asc');
      changeSort('snapshot_count');
    }
  };

  const toggOrder = (data) => {
    if (data === 'desc') {
      changeOrder('desc');
      changeSort('created_at');
    }
    if (data === 'asc') {
      changeOrder('asc');
      changeSort('created_at');
    }
  };

  return (
    <SafeAreaView style={[GlobalStyles.droidSafeArea, { flex: 1 }]}>
      <Plant width={120} height={40} fill="green" />
      <Text>My Garden</Text>
      {/* <SearchBar placeholder="search-plants" value={'plants'} /> */}
      <View style={styles.heroContainer}>
        <DropDownPicker
          items={[
            { label: 'newest', value: 'desc' },
            { label: 'oldest', value: 'asc' },
          ]}
          defaultValue={sort_by.value}
          containerStyle={{ height: 40 }}
          style={styles.dropDown}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => toggOrder(item.value)}
        />
        <DropDownPicker
          items={[
            { label: 'most snaps', value: 'most snaps' },
            { label: 'least snaps', value: 'least snaps' },
          ]}
          defaultValue={order.value}
          containerStyle={{ height: 40 }}
          style={styles.dropDown}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => toggleSortBy(item.value)}
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

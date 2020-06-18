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
import RNPickerSelect from 'react-native-picker-select';
import { FlatGrid } from 'react-native-super-grid';
import { SearchBar } from 'react-native-elements';
import * as api from '../../api-requests/api';
import * as svg from 'react-native-svg';
import Plant from '../../assets/plant.svg';
import GlobalStyles from '../../styles/GlobalStyles';
import { makeRefObj, formatArray } from '../../utils/utils';
import TimeAgo from 'react-native-timeago';

function Garden({ userId, navigation }) {
  // for some reason I have to send it as userId for it to pick it up on the destructuring?! It won't let me send it named as anything else. Maybe Expo being silly
  console.log('inside garden');
  const [sort_by, changeSort] = useState('created_at');
  const [snaps, setSnaps] = useState([]);
  const [loading, isLoading] = useState(true);
  const [order, changeOrder] = useState('desc');
  const [plant_type, changeType] = useState(null);
  const [plants, setPlants] = useState(userId);

  useEffect(() => {
    const runEffect = async () => {
      console.log('inside runEffect');
      const snaps = plants.map((plant) => {
        const { plant_id, plant_name, snapshot_count } = plant;

        return api
          .getSnapshotsByPlantId(plant_id)
          .then((snap) => {
            return {
              plant_name,
              snapshot_count,
              ...snap[0],
            };
          })
          .catch((err) => {
            console.log(err);
            Alert.alert('Error', `${err}`);
            setLoading(false);
          });
      });
      const gotSnaps = await Promise.all(snaps);
      console.log(gotSnaps, '<----- snaps');
      setSnaps(gotSnaps);
      isLoading(false);
    };
    runEffect();
  }, [order, sort_by, plant_type]);

  if (loading)
    return (
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );

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

  const toggleOrder = (data) => {
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
      <Text>My Garden</Text>
      <View style={styles.heroContainer}>
        <RNPickerSelect
          onValueChange={(value) => toggleOrder(value)}
          placeholder={{}}
          items={[
            {
              label: 'newest',
              value: 'desc',
            },
            {
              label: 'oldest',
              value: 'asc',
            },
          ]}
        />
        <RNPickerSelect
          onValueChange={(value) => toggleSortBy(value)}
          placeholder={{
            label: 'sort by',
          }}
          items={[
            {
              label: 'most snaps',
              value: 'most snaps',
            },
            {
              label: 'least snaps',
              value: 'least snaps',
            },
          ]}
        />
        <RNPickerSelect
          onValueChange={(value) => changeType(value)}
          placeholder={{
            label: 'all plants',
          }}
          items={[
            {
              label: 'garden',
              value: 'garden',
            },
            {
              label: 'vegetable',
              value: 'vegetable',
            },
            {
              label: 'fruit',
              value: 'fruit',
            },
            {
              label: 'herb',
              value: 'herb',
            },
            {
              label: 'houseplant',
              value: 'houseplant',
            },
            {
              label: 'succulent',
              value: 'succulent',
            },
          ]}
        />
      </View>
      <View style={styles.container}>
        {snaps.length === 0 && (
          <>
            <Text>you don't have any plants! get growing!</Text>
            <Button
              title="add new plant"
              onPress={() => {
                navigation.navigate('new plant');
              }}
            />
          </>
        )}
        <FlatGrid
          itemDimension={130}
          data={snaps}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <View>
              <View style={styles.plantContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('plant page', {
                      item,
                    })
                  }
                  style={styles.image}
                >
                  <Image
                    source={{
                      uri: item.plant_uri,
                    }}
                    style={styles.image}
                    onLoad={isLoading(false)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.plant_view}>
                <View style={styles.plant_left_view}>
                  <Text style={styles.plantName}>{item.plant_name}</Text>
                  <TimeAgo time={item.created_at} />
                  <View>
                    <Plant width={120} height={40} fill="green" />
                    <Text style={styles.plantStats}>{item.height}</Text>
                  </View>
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
    width: 100,
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

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import * as api from '../../api-requests/api';
import TimeAgo from 'react-native-timeago';
import SnapshotCarousel from './SnapshotCarousel';

function PlantPage(props) {
  const {
    plant_id,
    plant_uri,
    height,
    plant_name,
    snapshot_count,
    created_at,
  } = props.route.params.item;

  const [plant, addPlantData] = useState([]);
  const [snapshots, addSnapshotData] = useState(undefined);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const promises = [
      api.getPlantById(plant_id),
      api.getSnapshotsByPlantId(plant_id),
    ];
    Promise.all(promises).then((plantSnaps) => {
      addPlantData(plantSnaps[0]);
      addSnapshotData(plantSnaps[1]);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: plant_uri,
          }}
          style={styles.image}
          //   onLoad={isLoading(false)}
        />
      </View>
      <View style={styles.backGroundPlate}>
        <Text style={styles.name_text}>{plant_name}</Text>
        <Text style={styles.type_text}>{plant.plant_variety}</Text>
        <View style={styles.plant_info_view}>
          <View style={styles.plant_info_left_view}>
            <Text>height: {height}cm</Text>
            <Text>
              latest snap: <TimeAgo time={created_at} />
            </Text>
            <Text>soil: {plant.soil}</Text>
            <Text>sunlight: {plant.sunlight}</Text>
          </View>
          <View style={styles.plant_info_right_view}>
            <Text>type: {plant.plant_type}</Text>
            <Text>water: {plant.watering_freq}</Text>
            <Text>location: {plant.location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}></TouchableOpacity>
      </View>
      <View>
        <Text>recent snapshots</Text>
      </View>
      {snapshots && <SnapshotCarousel snapshots={snapshots} />}
      <TouchableOpacity style={styles.button}></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  image: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  backGroundPlate: {
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: '#e6e6e6',
  },
  name_text: {
    textAlign: 'center',
  },
  type_text: {
    textAlign: 'center',
  },
  plant_info_view: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  plant_info_left_view: {
    flex: 2,
  },
  plant_info_right_view: {
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#52875a',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PlantPage;

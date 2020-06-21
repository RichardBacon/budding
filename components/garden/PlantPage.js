// dark green = #355a3a

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
  Dimensions,
  Alert,
} from 'react-native';
import * as api from '../../api-requests/api';
import TimeAgo from 'react-native-timeago';
import SnapshotCarousel from './SnapshotCarousel';
import PlantHeightIcon from '../../assets/icons/plant_height_plant_page.svg';
import CreatedAtIcon from '../../assets/icons/latest_snap_plant_page.svg';
import PotHeightIcon from '../../assets/icons/pot_height_plant_page.svg';
import SoilIcon from '../../assets/icons/soil_type_plant_page.svg';
import SunIcon from '../../assets/icons/sunlight_plant_page.svg';
import PlantTypeIcon from '../../assets/icons/plant_type_page.svg';
import WaterIcon from '../../assets/icons/water_plant_page.svg';
import LocationIcon from '../../assets/icons/indoor_vs_outdoor_plant_page.svg';
import * as Font from 'expo-font';

function PlantPage(props) {
  const { navigation } = props;

  const {
    plant_id,
    plant_uri,
    height,
    plant_name,
    snapshot_count,
    created_at,
    pot_height,
  } = props.route.params.item;

  const [plant, addPlantData] = useState([]);
  const [snapshots, addSnapshotData] = useState(undefined);
  const [loading, isLoading] = useState(true);
  const [fontLoading, loadFont] = useState(true);

  useEffect(() => {
    const promises = [
      api.getPlantById(plant_id),
      api.getSnapshotsByPlantId(plant_id),
      Font.loadAsync({
        arciform: require('../../assets/fonts/Arciform.otf'),
      }),
    ];
    Promise.all(promises).then((plantSnaps) => {
      addPlantData(plantSnaps[0]);
      addSnapshotData(plantSnaps[1]);
      loadFont(false);
    });
  }, []);

  let ScreenHeight = Dimensions.get('window').height;

  return (
    <ScrollView>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: ScreenHeight,
            backgroundColor: 'white',
          }}
        >
          <Image
            style={{ width: 100, height: 100, backgroundColor: 'white' }}
            source={require('../../assets/gifs/Shifter_V01.gif')}
          />
        </View>
      )}
      {!fontLoading && (
        <View>
          <View style={styles.container}>
            <Image
              // onLoad={() => isLoading(false)}
              onLoadEnd={() => isLoading(false)}
              source={{
                uri: plant_uri,
              }}
              style={styles.image}
              //   onLoad={isLoading(false)}
            />
          </View>
          <View style={styles.background_plate}>
            <Text style={styles.name_text}>{plant_name}</Text>
            <Text style={styles.type_text}>{plant.plant_variety}</Text>
            <View style={styles.plant_info_view}>
              <View style={styles.plant_info_left_view}>
                <View style={styles.plant_info_card}>
                  <PlantHeightIcon width={30} height={30} fill="green" />
                  <Text style={styles.plant_info_text}>height: {height}cm</Text>
                </View>
                <View style={styles.plant_info_card}>
                  <CreatedAtIcon width={30} height={30} fill="green" />
                  <Text style={styles.plant_info_text}>
                    posted:
                    <TimeAgo
                      time={plant.created_at}
                      style={styles.plant_info_text}
                    />
                  </Text>
                </View>
                <View style={styles.plant_info_card}>
                  <SoilIcon width={30} height={30} fill="green" />
                  <Text style={styles.plant_info_text}>soil: {plant.soil}</Text>
                </View>
                <View style={styles.plant_info_card}>
                  <SunIcon width={30} height={30} fill="green" />

                  <Text style={styles.plant_info_text}>
                    sunlight: {plant.sunlight}
                  </Text>
                </View>
              </View>
              <View style={styles.plant_info_right_view}>
                <View style={styles.plant_info_card}>
                  <PlantTypeIcon width={30} height={30} fill="green" />
                  <Text style={styles.plant_info_text}>
                    type: {plant.plant_type}
                  </Text>
                </View>
                <View style={styles.plant_info_card}>
                  <WaterIcon width={30} height={30} fill="green" />
                  <Text style={styles.plant_info_text}>
                    water: {plant.watering_freq}
                  </Text>
                </View>
                <View style={styles.plant_info_card}>
                  <LocationIcon width={30} height={30} fill="green" />

                  <Text style={styles.plant_info_text}>
                    location: {plant.location}
                  </Text>
                </View>
                <View style={styles.plant_info_card}>
                  <PotHeightIcon width={30} height={30} fill="green" />

                  <Text style={styles.plant_info_text}>
                    pot height: {plant.pot_height}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('edit plant', {
                  plant_id,
                });
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>edit plant </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('plant navigator', {
                  plant_id,
                  pot_height: plant.pot_height,
                });
              }}
              style={styles.button}
            >
              <Text style={styles.button_text_new}>new snapshot </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                // Asks for confirmation to delete the plant
                // If confirm, sends request to delete, if 204 response navigates back to garden
                // If cancel, does nothing
                Alert.alert(
                  `Delete ${plant_name}`,
                  `Are you sure you want to permanently delete ${plant_name}?`,
                  [
                    {
                      text: 'No, do not delete!',
                      onPress: () => {
                        console.log('deletion cancelled');
                      },
                    },
                    {
                      text: 'Yes, delete!',
                      onPress: () => {
                        api.deletePlantById(plant_id).then((response) => {
                          if (response.status === 204) {
                            Alert.alert(
                              'Plant deleted!',
                              `Successfully deleted ${plant_name}`,
                            );
                            navigation.navigate('garden');
                            // plant name deleted
                          } else {
                            Alert.alert(
                              'Unsuccessful',
                              `Could not delete ${plant_name} - please try again`,
                            );
                            // deletion unsuccessful
                          }
                        });
                      },
                    },
                  ],
                );
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>delete plant </Text>
            </TouchableOpacity>
            <Text style={styles.recent_snaps}>recent snapshots</Text>
          </View>
          {snapshots && <SnapshotCarousel snapshots={snapshots} />}
          <TouchableOpacity
            style={styles.button_all}
            onPress={() =>
              navigation.navigate('all snapshots', {
                snapshots,
                plant_name,
                pot_height,
              })
            }
          >
            <Text style={styles.button_text_all}>all snapshots </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: '#355a3a',
    shadowOpacity: 3,
    elevation: 2,
    backgroundColor: '#355a3a',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    marginBottom: 40,
  },
  image: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  background_plate: {
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    marginBottom: 10,
  },
  name_text: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#355a3a',
    fontFamily: 'arciform',
  },
  type_text: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
  },
  timeago_text: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 15,
    color: 'gray',
  },
  plant_info_view: {
    paddingTop: 20,
    paddingLeft: '8%',
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  plant_info_left_view: {
    flex: 2,
    flexDirection: 'column',
  },
  plant_info_right_view: {
    flex: 2,
    flexDirection: 'column',
  },
  plant_info_card: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 20,
  },
  plant_info_text: {
    fontSize: 15,
    marginLeft: 10,
    paddingRight: 40,
  },
  button: {
    backgroundColor: '#fdbe39',
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
    height: 45,
  },
  button_text_new: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_text_all: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
  },
  button_all: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    marginBottom: 25,
    marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  recent_snaps: {
    textAlign: 'center',
    margin: 10,
    marginTop: 20,
    fontSize: 25,
    marginBottom: 25,
    color: '#355a3a',
    fontFamily: 'arciform',
  },
});

export default PlantPage;

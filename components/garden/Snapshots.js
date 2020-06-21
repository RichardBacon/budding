import React, { useRef, useState, useEffect } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Moment from 'react-moment';
import { getDayMonth } from '../../utils/utils';
import { FlatGrid } from 'react-native-super-grid';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../styles/GlobalStyles';
import TimeAgo from 'react-native-timeago';
import PlantHeightIcon from '../../assets/icons/plant_height_snapshot_page.svg';
import * as Font from 'expo-font';
import * as api from '../../api-requests/api';

function Snapshots(props) {
  const { snapshots, plant_name, plant_id, potHeight } = props.route.params;
  console.log(props.route.params);
  const { navigation } = props;
  const [loading, isLoading] = useState(true);
  const [fontLoading, loadFont] = useState(true);

  useEffect(() => {
    let promise = new Promise((resolve, reject) => {
      Font.loadAsync({
        arciform: require('../../assets/fonts/Arciform.otf'),
      });
    }).then(loadFont(false));
  }, []);

  console.log(loading);

  let ScreenHeight = Dimensions.get('window').height;
  let ScreenWidth = Dimensions.get('window').width * 0.9;

  const allDays = snapshots.map((snapshot) => {
    return getDayMonth(snapshot.created_at);
  });

  const allHeights = snapshots.map((snapshot) => {
    return snapshot.height;
  });

  return (
    <SafeAreaView
      style={[GlobalStyles.droidSafeArea, { flex: 1, paddingBottom: 0 }]}
    >
      <ScrollView style={{ marginBottom: 0 }}>
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

        {snapshots.length === 1 && (
          <View style={styles.background_plate_blank}>
            <Text style={styles.header_name}>{plant_name}</Text>
            <Text>Add new snapshots to reveal plant's chart progress</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('plant navigator', {
                  plant_id,
                  pot_height: potHeight,
                });
              }}
              style={styles.button}
            >
              <Text style={styles.button_text_new}>new snapshot </Text>
            </TouchableOpacity>
          </View>
        )}

        {snapshots.length > 1 && (
          // <View style={{backgroundColor: '#52875a', marginLeft: 10, marginRight: 10, height: 250}}>
          <View style={styles.background_plate}>
            <View style={styles.header}>
              <Text style={styles.header_name}>{plant_name}</Text>
              <Text style={styles.header_progress}>growth progress chart</Text>
            </View>
            <View style={styles.plant_info_view}>
              <LineChart
                data={{
                  labels: allDays,
                  datasets: [
                    {
                      data: allHeights,
                    },
                  ],
                }}
                width={ScreenWidth} // from react-native
                height={220}
                yAxisSuffix="cm"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#52875a',
                  backgroundGradientTo: '#52875a',
                  backgroundGradientFromOpacity: 1,
                  backgroundGradientToOpacity: 1,
                  decimalPlaces: 1, // optional, defaults to 2dp
                  color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    // borderRadius: 16,
                    // marginRight: 10,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '5',
                    color: '#fdbe39',
                  },
                }}
                bezier
                style={{
                  paddingVertical: 15,
                  backgroundColor: '#52875a',
                  //  paddingHorizontal: 0,
                  // padding: 10,
                  // borderRadius: 15,
                }}
              />
            </View>
          </View>
          // </View>
        )}
        <Text style={styles.header_snapshots}>snapshots</Text>
        <View style={styles.container}>
          <FlatGrid
            itemDimension={130}
            data={snapshots}
            style={styles.grid_view}
            spacing={10}
            renderItem={({ item }) => (
              <View>
                <View style={styles.plant_container}>
                  <Image
                    source={{ uri: item.plant_uri }}
                    style={styles.image}
                    onLoadEnd={isLoading(false)}
                  />
                </View>
                <View style={styles.plant_details}>
                  <Text style={styles.timeAgo_pre_text}>
                    snapped:{' '}
                    <TimeAgo
                      time={item.created_at}
                      style={styles.timeAgo_text}
                    />
                  </Text>

                  <View style={styles.height_details}>
                    {/* <PlantHeightIcon width={25} height={25} fill="green" /> */}
                    <Text style={styles.height_pre_text}>
                      plant height:
                      <Text style={styles.height_text}>{item.height}</Text>
                    </Text>
                  </View>
                </View>
                {snapshots.length > 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        `Delete snapshot`,
                        `Are you sure you want to permanently delete this snapshot?`,
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
                              api
                                .deleteSnapshotById(item.snapshot_id)
                                .then((response) => {
                                  if (response.status === 204) {
                                    Alert.alert(
                                      'Snapshot deleted!',
                                      `Successfully deleted snapshot`,
                                    );
                                    navigation.navigate('garden');
                                  } else {
                                    Alert.alert(
                                      'Unsuccessful',
                                      `Could not delete snapshot - please try again`,
                                    );
                                  }
                                });
                            },
                          },
                        ],
                      );
                    }}
                    style={styles.delete_button}
                  >
                    <Text style={styles.delete_button_text}>
                      delete snapshot{' '}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  header_name: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#355a3a',
    fontFamily: 'arciform',
  },
  header_progress: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
  },
  header_snapshots: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 32,
    color: '#52875a',
    fontFamily: 'arciform',
  },

  grid_view: {
    marginTop: 5,
    marginBottom: -10,
    flex: 1,
    marginLeft: '2.5%',
    marginRight: '2.5%',
  },
  container: {
    flex: 2,
    zIndex: 1,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  plant_name: {
    fontSize: 16,
    color: '#52875a',
    fontWeight: '900',
  },
  height: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  timeAgo_text: {
    fontSize: 12,
    color: '#52875a',
    marginTop: 10,
    fontWeight: '800',
  },
  timeAgo_pre_text: {
    fontSize: 12,
    color: '#52875a',
    marginTop: 10,
    fontWeight: '400',
  },
  height_text: {
    fontWeight: '600',
    fontSize: 12,
    color: '#52875a',
    // paddingLeft: '5%',
  },
  height_pre_text: {
    fontWeight: '400',
    fontSize: 12,
    color: '#52875a',
    // paddingLeft: '5%',
  },
  plant_container: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 250,
    borderColor: '#52875a',
    borderWidth: 1,
  },
  plant_details: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 4,
  },
  height_details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#52875a',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  delete_button: {
    backgroundColor: 'red',
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 45,
  },
  button_text: {
    fontSize: 20,
    color: '#fff',
  },
  background_plate: {
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 25,
  },
  background_plate_blank: {
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#e6e6e6',
    borderRadius: 25,
    marginBottom: 10,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 25,
  },
  delete_button_text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  plant_info_view: {
    // marginBottom: 25,s
    // paddingLeft: '8%',
    // paddingRight: 10,
    backgroundColor: 'green',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  button: {
    backgroundColor: '#fdbe39',
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '83%',
    height: 45,
  },
  button_text_new: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Snapshots;

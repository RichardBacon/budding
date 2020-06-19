import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Moment from 'react-moment';
import { getDayMonth } from '../../utils/utils';
import { FlatGrid } from 'react-native-super-grid';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../styles/GlobalStyles';
import TimeAgo from 'react-native-timeago';
import Plant from '../../assets/plant.svg';
import * as Font from 'expo-font';

function Snapshots(props) {
  const { snapshots, plant_name } = props.route.params;
  const { navigation } = props;
  const [loading, isLoading] = useState(true);
  const [fontLoading, loadFont] = useState(true);

  useEffect(() => {
    let promise = new Promise((resolve, reject) => {
    Font.loadAsync({
      'arciform': require('../../assets/fonts/Arciform.otf'),
    })
    }).then(
  loadFont(false),
)
}, []);

console.log(loading)

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width*0.85;

  const allDays = snapshots.map((snapshot) => {
    return getDayMonth(snapshot.created_at);
  });

  const allHeights = snapshots.map((snapshot) => {
    return snapshot.height;
  });

  return (
    <SafeAreaView style={[GlobalStyles.droidSafeArea, { flex: 1, paddingBottom: 0}]}>
      <ScrollView style={{marginBottom: 0}}>
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
        <View style={styles.header}>
          <Text style={styles.header_name}>{plant_name}</Text>
          <Text style={styles.header_progress}>progress chart</Text>
        </View>
        {snapshots.length === 1 && (
          <View>
            <Text>Add new snapshots to reveal plant's chart progress</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.button_text}>new snapshot </Text>
            </TouchableOpacity>
          </View>
        )}
        {snapshots.length > 1 && (
          <View style={{backgroundColor: '#52875a', marginLeft: 10, marginRight: 10, height: 250}}>
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
              // backgroundColor: '#e26a00',
              // backgroundGradientFrom: '#52875a',
              // backgroundGradientTo: '#52875a',
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                // marginRight: 10,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '5',
                color: '#fdbe39',
              },
            }}
            bezier
            style={{
             paddingHorizontal: 12,
              padding: 10,
              borderRadius: 15,
            }}
          />
          </View>
        )}
        <Text style={styles.header_progress}>snapshots</Text>
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
                  <TimeAgo time={item.created_at} style={styles.height_text}/>
                  <View>
                    <Plant width={120} height={40} fill="green" />
                    <Text style={styles.height_text}>{item.height}</Text>
                  </View>
                </View>
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
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10
  },
  header_name: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#355a3a',
    fontFamily: 'arciform',
    marginBottom: 10
  }, 
  header_progress: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 25,
    color: '#52875a',
    fontFamily: 'arciform',
  },
  grid_view: {
    marginTop: 5,
    marginBottom: -10,
    flex: 1,
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
    alignItems: 'center'
  },
  height_text: {
    fontWeight: '600',
    fontSize: 12,
    color: '#52875a',
  },
  plant_container: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 250,
    borderColor: '#52875a',
    borderWidth: 1,
  },
  plant_details : {
    flex: 1,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#52875a',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  button_text: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Snapshots;

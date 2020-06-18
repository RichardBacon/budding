import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  useEffect,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Moment from 'react-moment';
import { getDayMonth } from '../../utils/utils';
import { FlatGrid } from 'react-native-super-grid';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '../../styles/GlobalStyles';
import TimeAgo from 'react-native-timeago';
import Plant from '../../assets/plant.svg';

function Snapshots(props) {
  const { snapshots, plant_name } = props.route.params;
  const { navigation } = props;

  const allDays = snapshots.map((snapshot) => {
    return getDayMonth(snapshot.created_at);
  });

  const allHeights = snapshots.map((snapshot) => {
    return snapshot.height;
  });

  return (
    <SafeAreaView style={[GlobalStyles.droidSafeArea, { flex: 1 }]}>
      <Text>{plant_name}</Text>
      <Text>progress chart</Text>
      {snapshots.length === 1 && (
        <View>
          <Text>Add new snapshots to reveal plant's chart progress</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>new snapshot </Text>
          </TouchableOpacity>
        </View>
      )}
      {snapshots.length > 1 && (
        <LineChart
          data={{
            labels: allDays,
            datasets: [
              {
                data: allHeights,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisSuffix="cm"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#52875a',
            backgroundGradientTo: '#52875a',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              color: '#fdbe39',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}

      <Text>all snapshots</Text>
      <View style={styles.container}>
        <FlatGrid
          itemDimension={130}
          data={snapshots}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <View>
              <View style={styles.plantContainer}>
                <Image
                  source={{ uri: item.plant_uri }}
                  style={styles.image}
                  //   onLoad={isLoading(false)}
                />
              </View>
              <View>
                <Text style={styles.plantName}>{item.plant_name}</Text>
                <TimeAgo time={item.created_at} />
                <Plant width={120} height={40} fill="green" />
                <Text style={styles.plantStats}>{item.height}</Text>
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
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
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
  plantContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 250,
    borderColor: '#52875a',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#52875a',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Snapshots;

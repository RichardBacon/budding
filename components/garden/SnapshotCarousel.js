import * as React from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import TimeAgo from 'react-native-timeago';

export default function SnapshotCarousel({ snapshots }) {
  const carousel = React.useRef(null);
  const [carouselItems, setCarouselItems] = React.useState(snapshots);
  const [activeIndex, setIndex] = React.useState(0);

  const _renderItem = ({ item, index = '0' }) => {
    return (
      <View
        style={{
          backgroundColor: 'green',
          borderRadius: 5,
          height: 225,
          width: 225,
          // marginLeft: 25,
          // marginRight: 25,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.plant_uri,
          }}
        />
        <View
          style={{
            backgroundColor: '#52875a',
            position: 'absolute',
            height: 225,
            width: 225,
            borderRadius: 6,
            opacity: 0.6,
          }}
        ></View>
        <View style={styles.image_text}>
          <View>
            <Text style={styles.image_text}>
              created: <TimeAgo time={item.created_at} />
            </Text>
          </View>
          <View style={styles.image_text_height_bottom}>
            {/* <WhiteHeightIcon
              style={{ marginLeft: -85 }}
              width={200}
              height={25}
              fill="green"
            /> */}
            <Text style={styles.image_text}>Height: {item.height}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          layout={'default'}
          ref={carousel}
          data={carouselItems}
          sliderWidth={300}
          itemWidth={250}
          renderItem={_renderItem}
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
  },
  image_text: {
    position: 'absolute',
    color: 'white',
    fontSize: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold',
  },
  image_text_height_bottom: {
    marginTop: 190,
  },
});

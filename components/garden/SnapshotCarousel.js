import * as React from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import TimeAgo from 'react-native-timeago';

export default function SnapshotCarousel({ snapshots }) {
  console.log(snapshots);
  const carousel = React.useRef(null);
  const [carouselItems, setCarouselItems] = React.useState(snapshots);
  const [activeIndex, setIndex] = React.useState(0);

  const _renderItem = ({ item, index = '0' }) => {
    return (
      <View
        style={{
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          height: 250,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.plant_uri,
          }}
        ></Image>
        <Text>Height: {item.height}</Text>
        <Text>
          created: <TimeAgo time={item.created_at} />
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'green', paddingTop: 50 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          layout={'default'}
          ref={carousel}
          data={carouselItems}
          sliderWidth={300}
          itemWidth={300}
          renderItem={_renderItem}
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  image: {
    position: 'absolute',
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
  },
});

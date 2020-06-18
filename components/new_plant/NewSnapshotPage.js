import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Pot from '../../assets/pot_measure.svg';

function NewSnapshotPage(props) {
  const [potHeight, setPotHeight] = useState(image.pot_height);
  const { navigation } = props;
  const { image } = props.route.params;

  // pass pot height down as a prop, set this as state, and have in input box when loads

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#52875a',
      }}
    >
      <Text>new snapshot</Text>
      <Text>first, enter your plant pot height below:</Text>
      <Pot width={300} height={400}></Pot>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TextInput
          keyboardType="numeric"
          returnKeyType="done"
          value={potHeight}
          onChangeText={(height) => {
            setPotHeight(height);
          }}
          style={styles.input}
          placeholder={'0'}
          placeholderTextColor="white"
        />
        <Text style={styles.cm_text}> cm</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('measure plant', {
            potHeight,
            image,
          });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>measure</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: 'white',
    fontSize: 50,
    textAlign: 'right',
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#52875a',
  },
  cm_text: {
    fontSize: 50,
  },
});

export default NewSnapshotPage;

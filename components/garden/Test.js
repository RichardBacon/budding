import React, { Component } from 'react';
import { View, Item } from 'react-native';
import { Picker } from '@react-native-community/picker';

function Test() {
  const [value, setValue] = React.useState('key1');

  return (
    <Picker
      selectedValue={value}
      onValueChange={(v) => setValue(v)}
      mode="dropdown"
    >
      <Item label="hello" value="key0" />
      <Item label="world" value="key1" />
    </Picker>
  );
}

export default Test;

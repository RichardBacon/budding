import React, { Component } from 'react';
import { View, Item, Picker } from 'react-native';
// import { Picker } from '@react-native-community/picker';
import DropDownPicker from 'react-native-dropdown-picker';

function Test() {
  const [value, setValue] = React.useState('uk');

  return (
    <DropDownPicker
      items={[
        { label: 'UK', value: 'uk' },
        { label: 'France', value: 'france' },
      ]}
      defaultValue={value}
      containerStyle={{ height: 40 }}
      style={{ backgroundColor: '#fafafa' }}
      dropDownStyle={{ backgroundColor: '#fafafa' }}
      // onChangeItem={(item) =>
      //   this.setState({
      //     country: item.value,
      //   })
      // }
    />
  );
}

export default Test;

import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  return (
    <View>
      <Text>
        <Icon name="rocket" size={30} color="#900" />
      </Text>
    </View>
  );
}

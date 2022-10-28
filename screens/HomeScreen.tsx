import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostBox from '../types/PostBox';
import usePostBoxes from '../actions/usePostBoxes';

enum PostBoxType {
  CONTENT,
  ENVELOP,
  NONE,
}

export default function HomeScreen() {
  const {postBoxes, isPostBoxLoading, postBoxError} = usePostBoxes();
  const [postBoxType, setPostBoxType] = useState<PostBoxType>(PostBoxType.NONE);
  const [userEnteredPostBoxName, setUserEnteredPostBoxName] = useState('');
  const [selectedPostBox, setSelectedPostBox] = useState<PostBox | null>(null);
  return (
    <View>
      <Text>
        <Icon name="rocket" size={30} color="#900" />
      </Text>
    </View>
  );
}

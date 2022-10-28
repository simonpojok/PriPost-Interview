import React, {useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import PostBox from '../types/PostBox';
import usePostBoxes from '../actions/usePostBoxes';
import Themes from '../themes';
import {Button, Title} from 'react-native-paper';
import PostContentTypeActionCard from '../components/PostContentTypeActionCard';

enum PostBoxType {
  CONTENT,
  ENVELOP,
  NONE,
}

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({navigation}: HomeScreenProps) {
  const {postBoxes} = usePostBoxes();
  const [postBoxType, setPostBoxType] = useState<PostBoxType>(PostBoxType.NONE);
  const [userEnteredPostBoxName, setUserEnteredPostBoxName] = useState('');
  const [selectedPostBox, setSelectedPostBox] = useState<PostBox | null>(null);

  const handleEnvelopePostBoxTypeSelected = () => {
    setPostBoxType(PostBoxType.ENVELOP);
  };

  const handleContentPostBoxTypeSelected = () => {
    setPostBoxType(PostBoxType.CONTENT);
  };

  const handlePostBoxNameChanged = async (postBoxName: string) => {
    setUserEnteredPostBoxName(postBoxName);
  };

  const handleMakeScreenClicked = () => {
    navigation.navigate('ScanDocumentScreen', {postBox: selectedPostBox});
  };

  const PostBoxRenderItem: ListRenderItem<PostBox> = ({item}) => {
    const postBoxSelectionHandler = () => {
      setSelectedPostBox(item);
      setUserEnteredPostBoxName('');
    };
    return (
      <Pressable onPress={postBoxSelectionHandler}>
        <View>
          <Title style={styles.postBoxListItem}>{item.full_number}</Title>
          <View style={styles.postBoxListItemSeparator} />
        </View>
      </Pressable>
    );
  };

  const filteredPostBoxes = postBoxes
    .filter(
      postBox =>
        userEnteredPostBoxName !== '' &&
        postBox.full_number
          .toLowerCase()
          .includes(userEnteredPostBoxName.toLowerCase()),
    )
    .filter(postBox =>
      postBoxType === PostBoxType.ENVELOP
        ? postBox.supports_envelope_scans
        : true,
    );

  const isEnvelopTypeSelected = postBoxType === PostBoxType.ENVELOP;
  const isContentTypeSelected = postBoxType === PostBoxType.CONTENT;

  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <View>
          <View style={styles.contentTypeSelectionContainer}>
            <PostContentTypeActionCard
              iconName="envelope"
              title="Envelop"
              onPressAction={handleEnvelopePostBoxTypeSelected}
              isSelected={isEnvelopTypeSelected}
            />
            <PostContentTypeActionCard
              iconName="paperclip"
              title="Content"
              onPressAction={handleContentPostBoxTypeSelected}
              isSelected={isContentTypeSelected}
            />
          </View>
          <View>
            <Text style={styles.postBoxNameText}>Search Post Boxes</Text>
            <TextInput
              placeholder="Type Post Box Name.."
              value={userEnteredPostBoxName}
              onChangeText={handlePostBoxNameChanged}
              style={styles.postBoxNameTextInput}
            />
            <FlatList
              style={styles.postBoxesList}
              data={filteredPostBoxes}
              renderItem={PostBoxRenderItem}
              keyExtractor={postBox => postBox.id}
              showsVerticalScrollIndicator={false}
            />
            {selectedPostBox && (
              <View style={styles.selectedPostBox}>
                <Title
                  style={[styles.postBoxListItem, styles.selectedPostBoxLabel]}>
                  {selectedPostBox.full_number}
                </Title>
                <EvilIcons name="check" size={24} color="#fff" />
              </View>
            )}
          </View>
        </View>
        <Button
          icon="scanner"
          mode="contained"
          onPress={handleMakeScreenClicked}>
          Make Scan
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingTop: 10,
  },
  contentTypeSelectionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  postBoxNameText: {
    marginTop: 30,
    marginBottom: 15,
    fontSize: 16,
  },
  postBoxNameTextInput: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  postBoxesList: {},

  postBoxListItem: {
    fontSize: 18,
    paddingVertical: 5,
  },

  postBoxListItemSeparator: {
    backgroundColor: Themes.colors.secondary,
    height: 1,
  },

  selectedPostBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Themes.colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },

  selectedPostBoxLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

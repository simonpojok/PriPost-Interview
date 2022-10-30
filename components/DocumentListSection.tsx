import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
  Pressable,
} from 'react-native';
import {ScannedDocument} from '../types/ScannedDocumentState';

interface DocumentListSectionProps {
  documents: Array<ScannedDocument>;
  onScannedDocumentClicked: (document: ScannedDocument) => void;
}

export default function DocumentListSection({
  documents,
  onScannedDocumentClicked,
}: DocumentListSectionProps) {
  const ScannedDocumentListItem: ListRenderItem<ScannedDocument> = ({item}) => {
    const imageUrl = `file://${item.photoFile.path}`;
    return (
      <View style={styles.documentItem}>
        <Pressable
          onPress={() => onScannedDocumentClicked(item)}
          style={{flex: 1}}>
          <Image
            resizeMethod="scale"
            source={{uri: imageUrl}}
            style={styles.documentImage}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={documents}
        renderItem={ScannedDocumentListItem}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  documentItem: {
    height: 200,
    width: '49%',
    margin: 2,
  },
  documentImage: {
    flex: 1,
  },
});

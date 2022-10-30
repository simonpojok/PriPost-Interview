import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PhotoFile} from 'react-native-vision-camera';
import {Title} from 'react-native-paper';
import EmptyDocumentSection from '../components/EmptyDocumentSection';

interface Document {
  photoFile: PhotoFile;
}

interface DocumentsScreenProps {
  navigation: any;
}

export default function DocumentsScreen({navigation}: DocumentsScreenProps) {
  const [documents] = useState<Array<Document>>([]);

  const handleOnScanDocumentsAction = () => {
    navigation.navigate('DocumentScanner');
  };

  const Content =
    documents.length === 0 ? (
      <EmptyDocumentSection
        handleOnScanDocumentsAction={handleOnScanDocumentsAction}
      />
    ) : (
      <View />
    );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.safeArea}>{Content}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  emptyDocumentsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

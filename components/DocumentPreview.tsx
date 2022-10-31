import React from 'react';
import {PhotoFile} from 'react-native-vision-camera';
import {Image, StyleSheet, View, Button} from 'react-native';
import {VoidFunction} from '../types/function/VoidFunction';

interface DocumentPreviewProps {
  photoFile: PhotoFile;
  onScanNextDocumentAction: VoidFunction;
  onDocumentScanDone: VoidFunction;
}
export default function DocumentPreview({
  photoFile,
  onScanNextDocumentAction,
  onDocumentScanDone,
}: DocumentPreviewProps) {
  const imageUrl = `file://${photoFile.path}`;
  return (
    <View style={styles.previewContainer}>
      <Image
        resizeMethod="scale"
        source={{uri: imageUrl}}
        style={styles.previewImage}
      />
      <View style={styles.actionButtonsContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Scan Next" onPress={onScanNextDocumentAction} />
        </View>
        <View style={styles.buttonContainer} />
        <View style={styles.buttonContainer}>
          <Button title="Done" onPress={onDocumentScanDone} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
  },
  previewImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    flex: 1,
  },
});

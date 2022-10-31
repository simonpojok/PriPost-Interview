import React from 'react';
import {Button, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import {VoidFunction} from '../types/function/VoidFunction';
import RouteNames from './RouteNames';
import {DocumentScanningType} from './DocumentScannerScreen';

interface DocumentEditorScreenProps {
  route: any;
  navigation: any;
}

export default function DocumentEditorScreen({
  route,
  navigation,
}: DocumentEditorScreenProps) {
  const {documentPath} = route.params;
  const imageUrl = `file://${documentPath}`;

  const handleOkAction: VoidFunction = () => {
    navigation.goBack();
  };

  const handleReScanDocumentAction: VoidFunction = () => {
    navigation.navigate(RouteNames.DOCUMENT_SCANNER, {
      documentPath: documentPath,
      scanType: DocumentScanningType.RE_SCAN_ONE_DOCUMENT,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Surface style={styles.surface}>
        <Image
          resizeMethod="scale"
          source={{uri: imageUrl}}
          style={styles.documentImage}
        />
        <View style={styles.actionButtonsContainer}>
          <View style={styles.buttonContainer}>
            <Button title="Retake" onPress={handleReScanDocumentAction} />
          </View>
          <View style={styles.buttonContainer} />
          <View style={styles.buttonContainer}>
            <Button title="OK" onPress={handleOkAction} />
          </View>
        </View>
      </Surface>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  surface: {
    flex: 1,
  },
  documentImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Camera, PhotoFile} from 'react-native-vision-camera';
import {VoidFunction} from '../types/function/VoidFunction';
import DocumentPreview from '../components/DocumentPreview';
import DocumentImageScanner from '../components/DocumentImageScanner';
import {EMPTY_DOCUMENT_PATH} from './DocumentsScreen';

interface DocumentScannerScreen {
  navigation: any;
  route: any;
}

export enum DocumentScanningType {
  RE_SCAN_ONE_DOCUMENT,
  SCAN_DOCUMENTS,
  SCAN_TWO_DOCUMENTS,
}

export default function DocumentScannerScreen({
  navigation,
  route,
}: DocumentScannerScreen) {
  const [photoFile, setPhotoFile] = useState<PhotoFile | null>(null);

  // Navigation
  const {documentPath, scanType} = route.params;

  // Effects
  useEffect(() => {
    Camera.requestCameraPermission()
      .then(() => {})
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  // Handlers
  const onScanNextDocumentAction: VoidFunction = () => setPhotoFile(null);
  const handleScanDocumentComplete: VoidFunction = () => navigation.goBack();

  const isRescanningDocument = documentPath !== EMPTY_DOCUMENT_PATH;
  console.log(scanType);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        {photoFile ? (
          <DocumentPreview
            photoFile={photoFile}
            onDocumentScanDone={handleScanDocumentComplete}
            onScanNextDocumentAction={onScanNextDocumentAction}
          />
        ) : (
          <DocumentImageScanner
            setCapturePhotoFile={setPhotoFile}
            isRescanningDocument={isRescanningDocument}
            oldPhotoFilePath={documentPath}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});

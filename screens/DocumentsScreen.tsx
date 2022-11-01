import React, {useEffect} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import EmptyDocumentSection from '../components/EmptyDocumentSection';
import {useSelector} from 'react-redux';
import {SharedState} from '../types/SharedState';
import DocumentListSection from '../components/DocumentListSection';
import RouteNames from './RouteNames';
import {ScannedDocument} from '../types/ScannedDocumentState';
import {DocumentScanningType} from './DocumentScannerScreen';
import {Title} from 'react-native-paper';
import {VoidFunction} from '../types/function/VoidFunction';
// @ts-ignore
import RNImageToPdf from 'react-native-image-to-pdf';
import usePostUpload from '../actions/usePostUpload';

export const EMPTY_DOCUMENT_PATH: string = '';

interface DocumentsScreenProps {
  navigation: any;
}

interface ScannedDocumentSelectorProps {
  documents: Array<ScannedDocument>;
}

export default function DocumentsScreen({navigation}: DocumentsScreenProps) {
  const {postUploadStatus, uploadPostDocument} = usePostUpload();
  // redux
  // @ts-ignore
  const {documents}: ScannedDocumentSelectorProps = useSelector(
    (state: SharedState) => state.scannedDocuments,
  );

  // Effectss
  useEffect(() => {
    if (documents.length === 0) {
      navigation.navigate(RouteNames.DOCUMENT_SCANNER, {
        scanType: DocumentScanningType.SCAN_DOCUMENTS,
        documentPath: EMPTY_DOCUMENT_PATH,
      });
    }
  }, [documents, navigation]);

  // Handlers
  const handleOnScanDocumentsAction = () => {
    navigation.navigate(RouteNames.DOCUMENT_SCANNER);
  };

  const handleOnScanDocumentClicked: (
    document: ScannedDocument,
  ) => void = document => {
    navigation.navigate(RouteNames.DOCUMENT_EDITOR, {
      documentPath: document.photoFile.path,
    });
  };

  const handleCompressToPDFAndUpload: VoidFunction = () => {
    const options = {
      imagePaths: documents.map(document => document.photoFile.path),
      name: 'post_documents.pdf',
      quality: 7,
      maxSize: {
        width: 900,
        height: 800,
      },
    };
    console.log('OPTIONS', options);
    RNImageToPdf.createPDFbyImages(options)
      .then((pdf: any) => uploadPostDocument(pdf))
      .catch((error: any) => console.log('ERROR OCURRED', error))
      .finally(() => console.log('DONE'));
  };

  console.log('Documents', documents);

  const Content =
    documents.length === 0 ? (
      <EmptyDocumentSection
        handleOnScanDocumentsAction={handleOnScanDocumentsAction}
      />
    ) : (
      <DocumentListSection
        documents={documents}
        onScannedDocumentClicked={handleOnScanDocumentClicked}
      />
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex: 1, padding: 10}}>
        <Title>POST BOX Number</Title>
        <View style={styles.safeArea}>{Content}</View>
        <View style={styles.uploadButtonContainer}>
          <Button title="Upload" onPress={handleCompressToPDFAndUpload} />
        </View>
      </View>
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
  uploadButtonContainer: {},
});

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import EmptyDocumentSection from '../components/EmptyDocumentSection';
import {useSelector} from 'react-redux';
import {SharedState} from '../types/SharedState';
import DocumentListSection from '../components/DocumentListSection';
import RouteNames from './RouteNames';
import {ScannedDocument} from '../types/ScannedDocumentState';
import {DocumentScanningType} from './DocumentScannerScreen';

export const EMPTY_DOCUMENT_PATH: string = '';

interface DocumentsScreenProps {
  navigation: any;
}

interface ScannedDocumentSelectorProps {
  documents: Array<ScannedDocument>;
}

export default function DocumentsScreen({navigation}: DocumentsScreenProps) {
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

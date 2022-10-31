import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {Button, Title} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SharedState} from '../types/SharedState';
import themes from '../themes';
import {PostBoxType} from '../types/PostBoxType';
import EmptyView from '../components/EmptyView';
import {VoidFunction} from '../types/function/VoidFunction';
import {AddDocumentActionCreator} from '../redux/actions/documentAction';
import {ScannedDocument} from '../types/ScannedDocumentState';
import DocumentPreview from '../components/DocumentPreview';
import ImageEditor from '@react-native-community/image-editor';

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
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const [photoFile, setPhotoFile] = useState<PhotoFile | null>(null);
  const device = devices.back;

  // Navigation
  const {documentPath, scanType} = route.params;

  // Redux
  const dispatch = useDispatch();
  const documentImages: Array<ScannedDocument> = useSelector(
    (state: SharedState) => state.scannedDocuments,
  );
  const {postBoxType}: any = useSelector(
    (state: SharedState) => state.postBoxType,
  );

  // Effects
  useEffect(() => {
    Camera.requestCameraPermission()
      .then(() => {})
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  useEffect(() => {}, [documentImages]);

  function handleScanDocumentInFocus() {
    if (camera !== null) {
      // @ts-ignore
      camera.current
        .takePhoto({
          flash: 'on',
        })
        .then(photo => {
          const addDocumentAction = AddDocumentActionCreator({
            photoFile: photo,
            editedDocument: null,
          });
          dispatch(addDocumentAction);
          setPhotoFile(photo);
        })
        .catch(error => console.log(error));
    }
  }

  // Handlers
  const onScanNextDocumentAction: VoidFunction = () => setPhotoFile(null);
  const handleScanDocumentComplete: VoidFunction = () => navigation.goBack();

  if (device == null) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  const isPageSideIndicatorVisible = postBoxType === PostBoxType.ENVELOP;
  const documentSideName = documentImages.length === 0 ? 'Front' : 'Back';

  console.log(documentPath, scanType);

  const DocumentImageScanner: () => JSX.Element = () => {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          ref={camera}
          device={device}
          isActive={true}
          photo={true}
          style={styles.camera}
        />
        <View style={[styles.camera, styles.cameraOverlay]}>
          {isPageSideIndicatorVisible ? (
            <View style={styles.documentSideIndicator}>
              <Title style={styles.documentIndicatorText}>
                {documentSideName}
              </Title>
            </View>
          ) : (
            <EmptyView />
          )}

          <View style={styles.cameraActionsContainer}>
            <Button
              style={styles.captureImage}
              icon="camera"
              mode="contained"
              onPress={handleScanDocumentInFocus}>
              Capture
            </Button>

            <Button
              style={styles.captureImage}
              mode="contained"
              onPress={handleScanDocumentComplete}>
              Done
            </Button>
          </View>
        </View>
      </View>
    );
  };

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
          <DocumentImageScanner />
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
  cameraContainer: {
    flex: 10,
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  documentSideIndicator: {
    borderRadius: 10,
    backgroundColor: themes.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
    width: 100,
  },
  documentIndicatorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraOverlay: {
    justifyContent: 'space-between',
    padding: 20,
  },
  cameraActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  captureImage: {
    width: '45%',
  },
  imageContainers: {
    backgroundColor: '#000',
    height: 100,
  },
  capturedImageItemContainer: {
    height: 100,
    width: 100,
    borderColor: '#000',
    borderWidth: 2,
  },
  capturedImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  documentImage: {
    flex: 1,
  },
});

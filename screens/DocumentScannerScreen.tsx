import React, {useEffect, useRef} from 'react';
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
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Button, Title} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SharedState} from '../types/SharedState';
import themes from '../themes';
import {PostBoxType} from '../types/PostBoxType';
import EmptyView from '../components/EmptyView';
import {VoidFunction} from '../types/function/VoidFunction';
import {AddDocumentActionCreator} from '../redux/actions/documentAction';
import {ScannedDocument} from '../types/ScannedDocumentState';

interface DocumentScannerScreen {
  navigation: any;
}

export default function DocumentScannerScreen({}: DocumentScannerScreen) {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

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
        })
        .catch(error => console.log(error));
    }
  }

  if (device == null) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  const DocumentImageItem: ListRenderItem<ScannedDocument> = ({item}) => {
    console.log('Rendering ============', item);
    const onDocumentClickedHandler = () => {};
    const imageUrl = `file://${item.photoFile.path}`;
    return (
      <Pressable onPress={onDocumentClickedHandler}>
        <View style={styles.capturedImageItemContainer}>
          <Image
            style={styles.capturedImage}
            resizeMethod="scale"
            source={{uri: imageUrl}}
          />
          <Title>{documentImages.length + 1}</Title>
        </View>
      </Pressable>
    );
  };

  const isPageSideIndicatorVisible = postBoxType === PostBoxType.ENVELOP;
  const documentSideName = documentImages.length === 0 ? 'Front' : 'Back';

  const handleScanDocumentComplete: VoidFunction = () => {
    // dispatch()
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
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
        <View style={styles.imageContainers}>
          <FlatList
            data={documentImages}
            renderItem={DocumentImageItem}
            keyExtractor={item => item.photoFile.path}
            scrollEnabled={true}
            horizontal={true}
          />
        </View>
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
});

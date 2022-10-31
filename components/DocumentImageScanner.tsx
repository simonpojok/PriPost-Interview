import React, {useRef} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {VoidFunction} from '../types/function/VoidFunction';
import {
  AddDocumentActionCreator,
  ReplaceDocumentActionCreator,
} from '../redux/actions/documentAction';
import {useDispatch} from 'react-redux';
import EmptyView from './EmptyView';
import {EMPTY_DOCUMENT_PATH} from '../screens/DocumentsScreen';

interface DocumentImageScannerProps {
  setCapturePhotoFile: (photoFile: PhotoFile) => void;
  isRescanningDocument: boolean;
  oldPhotoFilePath: string | null;
}

export default function DocumentImageScanner({
  setCapturePhotoFile,
  isRescanningDocument,
  oldPhotoFilePath,
}: DocumentImageScannerProps) {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  // Redux
  const dispatch = useDispatch();

  const handleScanDocumentInFocus: VoidFunction = () => {
    camera.current
      ?.takePhoto()
      .then(handleDocumentScannedSuccessfully)
      .catch(error => console.log(error));
  };

  // Handlers
  const handleDocumentScannedSuccessfully: (
    photoFile: PhotoFile,
  ) => void = photoFile => {
    if (
      isRescanningDocument &&
      oldPhotoFilePath !== null &&
      oldPhotoFilePath !== EMPTY_DOCUMENT_PATH
    ) {
      dispatch(
        ReplaceDocumentActionCreator(oldPhotoFilePath, {
          photoFile: photoFile,
          editedDocument: null,
        }),
      );
    } else {
      const addDocumentAction = AddDocumentActionCreator({
        photoFile: photoFile,
        editedDocument: null,
      });
      dispatch(addDocumentAction);
    }

    setCapturePhotoFile(photoFile);
  };

  if (device == null) {
    return <EmptyView />;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        device={device}
        isActive={true}
        photo={true}
        style={styles.camera}
      />
      <View style={styles.buttonContainer}>
        <View>
          <Button title="Capture" onPress={handleScanDocumentInFocus} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  cameraNotFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

import React, {useRef} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {VoidFunction} from '../types/function/VoidFunction';
import {AddDocumentActionCreator} from '../redux/actions/documentAction';
import {useDispatch} from 'react-redux';
import {Title} from 'react-native-paper';

interface DocumentImageScannerProps {
  setCapturePhotoFile: (photoFile: PhotoFile) => void;
}

export default function DocumentImageScanner({
  setCapturePhotoFile,
}: DocumentImageScannerProps) {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  // Redux
  const dispatch = useDispatch();

  const handleScanDocumentInFocus: VoidFunction = () => {
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
          setCapturePhotoFile(photo);
        })
        .catch(error => console.log(error));
    }
  };

  if (device == null) {
    return (
      <View style={styles.cameraNotFound}>
        <Title>No Camera Found</Title>
      </View>
    );
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
      <View>
        <Button title="Capture" onPress={handleScanDocumentInFocus} />
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
});

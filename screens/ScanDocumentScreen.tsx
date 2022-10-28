import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {Button} from 'react-native-paper';

export default function ScanDocumentScreen() {
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices('wide-angle-camera');
  const [documentImages, setDocumentImages] = useState<Array<PhotoFile>>([]);
  const device = devices.back;

  useEffect(() => {
    Camera.requestCameraPermission()
      .then(permissions => {
        console.log('PERMISSIONS', permissions);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  function handleScanDocumentInFocus() {
    if (camera !== null) {
      // @ts-ignore
      camera.current
        .takePhoto({
          flash: 'on',
        })
        .then(photo => {
          setDocumentImages(prevState => [...prevState, photo]);
          console.log('PHOTO', photo);
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

  const DocumentImageItem: ListRenderItem<PhotoFile> = ({item}) => {
    const imageUrl = `file://${item.path}`;
    return (
      <Image
        source={{uri: imageUrl}}
        style={styles.capturedImageItem}
        resizeMethod="scale"
      />
    );
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
          <View style={styles.camera}>
            <View style={styles.cameraActionsContainer}>
              <Button
                style={styles.captureImage}
                icon="camera"
                mode="contained"
                onPress={handleScanDocumentInFocus}>
                Press me
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.imageContainers}>
          <FlatList
            data={documentImages}
            renderItem={DocumentImageItem}
            keyExtractor={item => item.path}
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
  cameraActionsContainer: {
    height: 80,
  },
  captureImage: {},
  imageContainers: {
    backgroundColor: '#000',
  },
  capturedImageItem: {
    height: 100,
    width: 100,
    borderColor: '#000',
    borderWidth: 2,
  },
});

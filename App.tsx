import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanDocumentScreen from './screens/ScanDocumentScreen';
import HomeScreen from './screens/HomeScreen';
import ImageEditorScreen from './screens/ImageEditorScreen';
import ScannedDocumentScreen from './screens/ScannedDocumentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScanDocument" component={ScanDocumentScreen} />
        <Stack.Screen name="EditDocument" component={ImageEditorScreen} />
        <Stack.Screen
          name="ScannedDocument"
          component={ScannedDocumentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

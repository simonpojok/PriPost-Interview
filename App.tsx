import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DocumentEditorScreen from './screens/DocumentEditorScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import DocumentScannerScreen from './screens/DocumentScannerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DocumentEditor" component={DocumentEditorScreen} />
        <Stack.Screen name="DocumentsScreen" component={DocumentsScreen} />
        <Stack.Screen
          name="DocumentScanner"
          component={DocumentScannerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

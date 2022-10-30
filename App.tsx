import React, {ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeDashboardScreen from './screens/HomeDashboardScreen';
import DocumentEditorScreen from './screens/DocumentEditorScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import DocumentScannerScreen from './screens/DocumentScannerScreen';
import PriPostAppConfigurationProps from './components/PriPostAppConfiguration';
import RouteNames from './screens/RouteNames';

const Stack = createNativeStackNavigator();

interface NavigationConfiguration {
  children: ReactNode;
}

const NavigationConfiguration = ({children}: NavigationConfiguration) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteNames.HOME_NAME}>
        {children}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PriPostAppConfigurationProps>
      <NavigationConfiguration>
        <Stack.Screen
          name={RouteNames.HOME_NAME}
          component={HomeDashboardScreen}
        />
        <Stack.Screen
          name={RouteNames.DOCUMENT_EDITOR}
          component={DocumentEditorScreen}
        />
        <Stack.Screen
          name={RouteNames.DOCUMENTS_SCREEN}
          component={DocumentsScreen}
        />
        <Stack.Screen
          name={RouteNames.DOCUMENT_SCANNER}
          component={DocumentScannerScreen}
        />
      </NavigationConfiguration>
    </PriPostAppConfigurationProps>
  );
}

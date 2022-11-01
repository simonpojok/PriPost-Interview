import React, {ReactElement, ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeDashboardScreen from './screens/HomeDashboardScreen';
import DocumentEditorScreen from './screens/DocumentEditorScreen';
import DocumentsScreen from './screens/DocumentsScreen';
import DocumentScannerScreen from './screens/DocumentScannerScreen';
import PriPostAppConfigurationProps from './components/PriPostAppConfiguration';
import {logger as ReactNativeLogger} from 'react-native-logs';
import RouteNames from './screens/RouteNames';
import axios from 'axios';

const logger = ReactNativeLogger.createLogger({
  printDate: true,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
});

axios.interceptors.request.use(
  function (config) {
    logger.debug(config);
    return config;
  },
  function (error) {
    logger.error(error);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    logger.info(response);
    return response;
  },
  function (error) {
    logger.error(error);
    return Promise.reject(error);
  },
);

const Stack = createNativeStackNavigator();

interface NavigationConfiguration {
  children: ReactNode;
}

const NavigationConfiguration: (
  props: NavigationConfiguration,
) => ReactElement = ({children}) => {
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

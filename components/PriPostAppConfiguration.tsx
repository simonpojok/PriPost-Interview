import {store} from '../redux/store';
import {Provider as ReactNativePaperProvider} from 'react-native-paper';
import {Provider as ReduxStoreProvider} from 'react-redux';
import themes from '../themes';
import {ReactNode} from 'react';

interface PriPostAppConfigurationProps {
  children: ReactNode;
}

export default function PriPostAppConfiguration({
  children,
}: PriPostAppConfigurationProps) {
  return (
    <ReduxStoreProvider store={store}>
      <ReactNativePaperProvider theme={themes}>
        {children}
      </ReactNativePaperProvider>
    </ReduxStoreProvider>
  );
}

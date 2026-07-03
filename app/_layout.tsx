import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Platform, Linking } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';
import * as Application from 'expo-application';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

import { store } from '../src/redux/store/store';
import { loadAssets } from '../src/utils/loadAssets';
import { FCM_TOKEN_KEY } from '../src/config/constants';
import { UpdateVersion } from '../src/ui/modal/UpdateVersion';
import { ActiveRoutes } from '../src/navigation/routes/ActiveRoutes';
import { initFirebaseMessaging, fetchRemoteConfig } from '../src/services';

SplashScreen.preventAutoHideAsync();

function getAppBuildNumber(): number {
  if (Platform.OS === 'web') {
    return 0;
  }
  try {
    const DeviceInfo = require('react-native-device-info').default;
    return Number(DeviceInfo.getBuildNumber());
  } catch {
    return Number(Application.nativeBuildVersion ?? 0);
  }
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [update, setUpdate] = useState<Record<string, unknown>>({});
  const [updateIgnored, setUpdateIgnored] = useState(false);

  const saveFCMTokenLocally = async (token: string) => {
    const stored = await AsyncStorage.getItem(FCM_TOKEN_KEY);
    if (_.isNil(stored) || stored !== token) {
      await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await loadAssets();

        if (Platform.OS !== 'web') {
          const token = await initFirebaseMessaging();
          if (token) {
            await saveFCMTokenLocally(token);
          }
        }

        const value = await fetchRemoteConfig(Platform.OS);
        if (value) {
          setUpdate(JSON.parse(value));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const buildNumber = getAppBuildNumber();
  const versionNumber = Number(update?.version_number ?? 0);

  return (
    <GestureHandlerRootView style={styles.container} onLayout={onLayoutRootView}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <ActiveRoutes />
        </Provider>

        <UpdateVersion
          isCancelable={!update?.force}
          message={update?.description as string | undefined}
          visible={
            Platform.OS !== 'web' &&
            versionNumber > 0 &&
            versionNumber > buildNumber &&
            !updateIgnored
          }
          handleOk={() => {
            const storeUrl = update?.store_url as string | undefined;
            if (storeUrl) {
              Linking.openURL(storeUrl);
            } else if (Platform.OS === 'android') {
              Linking.openURL('market://details?id=com.quickshop.app');
            }
          }}
          handleCancel={() => setUpdateIgnored(true)}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

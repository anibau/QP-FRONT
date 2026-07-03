import { fetchAndActivate, getRemoteConfig, getValue } from 'firebase/remote-config';
import { firebaseApp } from './config';

export async function fetchRemoteConfig(key: string): Promise<string | null> {
  try {
    const remoteConfig = getRemoteConfig(firebaseApp);
    remoteConfig.settings.minimumFetchIntervalMillis = __DEV__ ? 0 : 3600000;
    await fetchAndActivate(remoteConfig);
    const value = getValue(remoteConfig, key).asString();
    return value || null;
  } catch (error) {
    console.warn('fetchRemoteConfig error:', error);
    return null;
  }
}

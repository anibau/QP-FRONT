import DeviceInfo from 'react-native-device-info';

export function getBuildNumberSync() {
  try {
    return DeviceInfo.getBuildNumber().toString();
  } catch {
    return '1';
  }
}

export function getVersionSync() {
  try {
    return DeviceInfo.getVersion();
  } catch {
    return '1.0.0';
  }
}

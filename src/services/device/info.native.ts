import DeviceInfo from 'react-native-device-info';

/**
 * Get app version
 */
export async function getDeviceVersion(): Promise<string> {
  try {
    return await DeviceInfo.getVersion();
  } catch (error) {
    console.warn('Error getting app version:', error);
    return '1.0.0';
  }
}

/**
 * Get build number
 */
export async function getBuildNumber(): Promise<string> {
  try {
    return await DeviceInfo.getBuildNumber();
  } catch (error) {
    console.warn('Error getting build number:', error);
    return '1';
  }
}

/**
 * Get device unique ID
 */
export async function getDeviceId(): Promise<string> {
  try {
    return await DeviceInfo.getUniqueId();
  } catch (error) {
    console.warn('Error getting device ID:', error);
    return 'unknown-device-id';
  }
}

/**
 * Get device model
 */
export async function getDeviceModel(): Promise<string> {
  try {
    return DeviceInfo.getModel();
  } catch (error) {
    console.warn('Error getting device model:', error);
    return 'unknown-model';
  }
}

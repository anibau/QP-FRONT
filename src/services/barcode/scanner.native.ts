import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { Platform } from 'react-native';

/**
 * Request camera permissions
 */
export async function requestCameraPermissions(): Promise<boolean> {
  try {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting camera permissions:', error);
    return false;
  }
}

/**
 * Request barcode scanner permissions
 */
export async function requestBarcodePermissions(): Promise<boolean> {
  try {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting barcode permissions:', error);
    return false;
  }
}

// Export components
export { BarCodeScanner, Camera };
export type { BarCodeScannedCallback, BarCodePoint, BarCodeSize } from 'expo-barcode-scanner';

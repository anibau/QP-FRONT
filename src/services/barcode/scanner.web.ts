/**
 * Mock barcode/camera module for web.
 */

const permissionResponse = {
  status: 'denied',
  granted: false,
  canAskAgain: false,
};

export async function requestCameraPermissions() {
  return false;
}

export async function requestBarcodePermissions() {
  return false;
}

export const BarCodeScanner = Object.assign(() => null, {
  getPermissionsAsync: async () => ({
    ...permissionResponse,
    status: 'undetermined',
    canAskAgain: true,
  }),
  requestPermissionsAsync: async () => permissionResponse,
  Constants: {
    BarCodeType: {
      qr: 'qr',
      code128: 'code128',
      upc_a: 'upc_a',
      upc_e: 'upc_e',
      upc_ean: 'upc_ean',
      aztec: 'aztec',
      codabar: 'codabar',
    },
  },
});

export const Camera = () => null;

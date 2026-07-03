/**
 * Web stub implementations
 * Device info is handled differently on web
 */

export async function getDeviceVersion(): Promise<string> {
  // Get version from package.json or app config
  return '1.0.0';
}

export async function getBuildNumber(): Promise<string> {
  return '1';
}

export async function getDeviceId(): Promise<string> {
  // Use browser storage or generate temporary ID
  try {
    let id = localStorage.getItem('web-device-id');
    if (!id) {
      id = `web-${Date.now()}`;
      localStorage.setItem('web-device-id', id);
    }
    return id;
  } catch {
    return 'web-device-id';
  }
}

export async function getDeviceModel(): Promise<string> {
  // Get browser info
  return navigator.userAgent;
}

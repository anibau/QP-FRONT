export async function getDeviceVersion(): Promise<string> {
  return '1.0.0';
}

export async function getBuildNumber(): Promise<string> {
  return '1';
}

export async function getDeviceId(): Promise<string> {
  return 'unknown-device-id';
}

export async function getDeviceModel(): Promise<string> {
  return 'unknown-model';
}

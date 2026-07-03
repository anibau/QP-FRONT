import * as Application from 'expo-application';

export function getBuildNumberSync() {
  return Application.nativeBuildVersion ?? '1';
}

export function getVersionSync() {
  return Application.nativeApplicationVersion ?? '1.0.0';
}

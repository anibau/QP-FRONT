import * as FileSystem from 'expo-file-system/legacy';

/**
 * Download a file to local storage (native).
 * @returns {Promise<string>} Local file URI
 */
export async function downloadFileToLocal(url, filename, headers = {}) {
  const fileUri = FileSystem.documentDirectory + filename;
  const { uri } = await FileSystem.downloadAsync(url, fileUri, { headers });
  return uri;
}

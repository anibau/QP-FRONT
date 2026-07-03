import axios from 'axios';
import {
  CREATE_SUGGESTION,
} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_ASYNCSTORAGE_KEY } from '../config/constants';
import { processData } from '../utils/utils';

export const createSuggestion = async (userId, incidentComment, file) => {
  try {
    const { access_token } = JSON.parse(
      await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY)
    );

    const formData = new FormData();
    formData.append('suggestion_id_user', userId.toString());
    formData.append('suggestion_description', incidentComment);

    if (file?.uri) {
      formData.append('file', {
        uri: file.uri,
        name: file.fullName || file.fileName || 'archivo.jpg',
        type: file.mimeType || 'image/jpeg',
      });
    }

    const response = await axios.post(CREATE_SUGGESTION, formData, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return processData(response);
  } catch (error) {
    console.log('createSuggestion error:', error);

    return {
      hasError: true,
      message:
        error?.response?.data?.message ??
        'Ocurrió un error al crear la sugerencia',
    };
  }
};

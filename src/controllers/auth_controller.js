import axios from "axios";
import { getGoogleData, getFacebookData } from './auth_social';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SIGN_IN, SIGN_UP_SOCIAL, UPDATE_USER, DOCUMENT_TYPES} from '../utils/urls';
import { AUTH_ASYNCSTORAGE_KEY} from '../config/constants';
import {processData} from '../utils/utils';
// ✅ Import platform-specific auth (will resolve to .ios or .web)
import { getAppleData, signOutApple } from './auth_apple';

/* ---------------- AUTH API ---------------- */

export const signInUser = async (email, password, so, version) => {
  try {
    const response = await axios.post(SIGN_IN, { email, password, so, version });
    return processData(response);
  } catch (error) {
    return {
      hasError: true,
      message: error?.response?.data?.message ?? "Ocurrió un error",
    };
  }
};

export const updateProfile = async (userId, userData) => {
  try {
    let { access_token } = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
    const response = await axios.put(UPDATE_USER + userId, {
      user_name: userData.firstName,
      user_lastname: userData.lastName,
      email: userData.email,
      birthday_date: userData.birthday,
      user_doc_number: userData.docNumber,
      cellphone: userData.phone,
    }, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    return processData(response);
  } catch (error) {
    return {
      hasError: true,
      message: error?.response?.data?.message ?? "Ocurrió un error",
    };
  }
};

export const getDocumentTypes = async () => {
  try {
    const response = await axios.get(DOCUMENT_TYPES);
    return processData(response);
  } catch (error) {
    return {
      hasError: true,
      message: error?.response?.data?.message ?? "Ocurrió un error",
    };
  }
};

export const signInSocialUser = async (email, providerId, so, version) => {
  try {
    const response = await axios.post(SIGN_IN, {
      email,
      provider_id: parseInt(providerId),
      so,
      version
    });
    return processData(response);
  } catch (error) {
    return {
      hasError: true,
      message: error?.response?.data?.message ?? "Ocurrió un error",
    };
  }
};

export const signUpSocialUser = async (data) => {
  try {
    const response = await axios.post(SIGN_UP_SOCIAL, data);
    return processData(response);
  } catch (error) {
    return {
      hasError: true,
      message: error?.response?.data?.message ?? "Ocurrió un error",
    };
  }
};

/* ---------------- SOCIAL LOGIN ---------------- */

// export const getGoogleData = async () => {
//   try {
//     await GoogleSignin.signOut();
//     await GoogleSignin.hasPlayServices();
//     const user = await GoogleSignin.signIn();
//     const credential = GoogleAuthProvider.credential(user.idToken);
//     const userCredential = await signInWithCredential(auth, credential);

//     return { cancelled: false, error: false, userData: userCredential.user };
//   } catch (e) {
//     return { cancelled: e.code === "12501", error: e.code !== "12501", userData: null };
//   }
// };

// export const getFacebookData = async () => {
//   try {
//     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
//     if (result.isCancelled) return { cancelled: true, error: false, userData: null };

//     const data = await AccessToken.getCurrentAccessToken();
//     const credential = FacebookAuthProvider.credential(data.accessToken);
//     const userCredential = await signInWithCredential(auth, credential);

//     return { cancelled: false, error: false, userData: userCredential.user };
//   } catch {
//     return { cancelled: false, error: true, userData: null };
//   }
// };

// ✅ getAppleData is now imported from auth_native.ios.js or auth_native.web.js
// No need to redefine it here

// Export signOutApple (also from auth_native)
export { signOutApple };

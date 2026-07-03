import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { getAuthInstance } from '../config/firebase';

export const getGoogleData = async () => {
  try {
    const auth = getAuthInstance();
    if (!auth) {
      return { cancelled: false, error: true, userData: null };
    }

    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;
    if (!idToken) {
      return { cancelled: true, error: false, userData: null };
    }

    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);

    return { cancelled: false, error: false, userData: userCredential.user };
  } catch (e) {
    return { cancelled: e.code === "12501", error: e.code !== "12501", userData: null };
  }
};

export const getFacebookData = async () => {
  try {
    const auth = getAuthInstance();
    if (!auth) {
      return { cancelled: false, error: true, userData: null };
    }

    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) return { cancelled: true, error: false, userData: null };

    const data = await AccessToken.getCurrentAccessToken();
    const credential = FacebookAuthProvider.credential(data.accessToken);
    const userCredential = await signInWithCredential(auth, credential);

    return { cancelled: false, error: false, userData: userCredential.user };
  } catch {
    return { cancelled: false, error: true, userData: null };
  }
};

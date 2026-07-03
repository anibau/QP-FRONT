/**
 * AUTH_NATIVE.IOS.JS
 * Lógica EXCLUSIVA de iOS (Apple Authentication)
 */

import { OAuthProvider, signInWithCredential } from 'firebase/auth';
import { getAuthInstance } from '../config/firebase';

/**
 * Apple Sign-In (iOS only)
 */
export const getAppleData = async () => {
  try {
    const auth = getAuthInstance();
    if (!auth) {
      return {
        cancelled: false,
        error: true,
        userData: null,
        errorMessage: 'Firebase is not configured',
      };
    }

    const appleAuth = require('@invertase/react-native-apple-authentication').default;

    if (!appleAuth?.isSupported) {
      return { 
        cancelled: false, 
        error: true, 
        userData: null,
        errorMessage: 'Apple Auth not supported on this device'
      };
    }

    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({
      idToken: response.identityToken,
      rawNonce: response.nonce,
    });

    const userCredential = await signInWithCredential(auth, credential);

    return { 
      cancelled: false, 
      error: false, 
      userData: userCredential.user 
    };
  } catch (error) {
    return { 
      cancelled: error?.code === 'ERR_REQUEST_CANCELLED', 
      error: error?.code !== 'ERR_REQUEST_CANCELLED', 
      userData: null,
      errorMessage: error?.message
    };
  }
};

/**
 * Apple Sign-Out
 */
export const signOutApple = async () => {
  try {
    return { success: true };
  } catch (error) {
    console.error('Error signing out Apple:', error);
    return { success: false, error };
  }
};

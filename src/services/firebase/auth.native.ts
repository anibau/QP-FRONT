import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  User,
} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { getAuthInstance } from './config';

function requireAuth() {
  const auth = getAuthInstance();
  if (!auth) {
    throw new Error('Firebase is not configured');
  }
  return auth;
}

/**
 * Initialize Google Sign-In with configuration
 */
export function initGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
  });
}

/**
 * Sign in with Google - NATIVE ONLY
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token from Google Sign-In');
    }

    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(requireAuth(), credential);
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 12501) {
      throw new Error('Google Sign-In cancelled by user');
    }
    throw error;
  }
}

/**
 * Sign in with Facebook - NATIVE ONLY
 */
export async function signInWithFacebook(): Promise<User> {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw new Error('Facebook Sign-In cancelled by user');
    }

    const accessTokenData = await AccessToken.getCurrentAccessToken();
    if (!accessTokenData) {
      throw new Error('No access token from Facebook');
    }

    const credential = FacebookAuthProvider.credential(accessTokenData.accessToken);
    const userCredential = await signInWithCredential(requireAuth(), credential);

    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  try {
    await GoogleSignin.signOut();
    const auth = getAuthInstance();
    if (auth) {
      await auth.signOut();
    }
  } catch (error) {
    console.warn('Sign out error:', error);
  }
}

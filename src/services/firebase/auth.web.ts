import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { getAuthInstance } from './config';

function requireAuth() {
  const auth = getAuthInstance();
  if (!auth) {
    throw new Error('Firebase is not configured');
  }
  return auth;
}

/**
 * Initialize Google Sign-In - NO-OP on Web
 */
export function initGoogleSignIn() {
  console.warn('Google Sign-In initialization not needed on web');
}

/**
 * Sign in with Google - WEB ONLY
 */
export async function signInWithGoogle(): Promise<User> {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    const result = await signInWithPopup(requireAuth(), provider);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Sign-In popup closed by user');
    }
    throw error;
  }
}

/**
 * Sign in with Facebook - WEB ONLY
 */
export async function signInWithFacebook(): Promise<User> {
  const provider = new FacebookAuthProvider();
  provider.addScope('public_profile');
  provider.addScope('email');

  const result = await signInWithPopup(requireAuth(), provider);
  return result.user;
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  try {
    await requireAuth().signOut();
  } catch (error) {
    console.warn('Sign out error:', error);
  }
}

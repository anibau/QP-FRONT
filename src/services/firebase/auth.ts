import { User, signOut as firebaseSignOut } from 'firebase/auth';
import { getAuthInstance } from './config';

export interface LoginCredentials {
  email: string;
  password: string;
}

function requireAuth() {
  const auth = getAuthInstance();
  if (!auth) {
    throw new Error('Firebase is not configured');
  }
  return auth;
}

/**
 * Logout user from Firebase
 */
export async function logout(): Promise<void> {
  await firebaseSignOut(requireAuth());
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): User | null {
  const auth = getAuthInstance();
  return auth?.currentUser ?? null;
}

/**
 * Update user display name
 */
export async function updateUserProfile(displayName: string): Promise<void> {
  const user = requireAuth().currentUser;
  if (!user) throw new Error('No user logged in');
  
  // TODO: Implementar actualización de perfil
  console.log('Update profile:', displayName);
}

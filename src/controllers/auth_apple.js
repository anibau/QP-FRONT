/**
 * Fallback genérico (NO usar Apple Auth aquí)
 * Metro lo exige como sibling cuando existen .ios.js / .web.js
 */

export const getAppleData = async () => ({
  cancelled: false,
  error: true,
  userData: null,
  errorMessage: 'Apple Sign-In not available on this platform',
});

export const signOutApple = async () => ({ success: true });

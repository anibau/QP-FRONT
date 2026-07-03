export const getAppleData = async () => ({
  cancelled: false,
  error: true,
  userData: null,
  errorMessage: 'Apple Sign-In not available on web',
});

export const signOutApple = async () => ({ success: true });

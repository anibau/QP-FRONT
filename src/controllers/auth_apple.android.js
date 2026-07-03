export const getAppleData = async () => ({
  cancelled: false,
  error: true,
  userData: null,
  errorMessage: 'Apple Sign-In only available on iOS',
});

export const signOutApple = async () => ({ success: true });

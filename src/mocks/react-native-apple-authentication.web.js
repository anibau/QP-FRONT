export const appleAuth = {
  isSupported: false,
  Operation: {
    LOGIN: 'LOGIN',
  },
  Scope: {
    EMAIL: 'EMAIL',
    FULL_NAME: 'FULL_NAME',
  },
  performRequest: async () => {
    throw new Error('Sign in with Apple no está soportado en web');
  },
};

export const AppleButton = () => null;


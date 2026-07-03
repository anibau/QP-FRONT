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
    throw new Error('Sign in with Apple solo está disponible en iOS');
  },
};

export const AppleButton = () => null;

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
    throw new Error('Apple Sign-In solo disponible en iOS');
  },
};

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
    throw new Error('Apple Sign-In no soportado en web');
  },
};

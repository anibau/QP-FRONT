export const getGoogleData = async () => {
  return {
    cancelled: false,
    error: true,
    userData: null,
    message: "Google Sign-In no está disponible en Web aún",
  };
};

export const getFacebookData = async () => {
  return {
    cancelled: false,
    error: true,
    userData: null,
    message: "Facebook Login no está disponible en Web aún",
  };
};

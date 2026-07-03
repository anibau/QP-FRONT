// Fallback por si Metro no puede resolver la plataforma
export const getGoogleData = async () => {
  return {
    cancelled: false,
    error: true,
    userData: null,
    message: "Auth social no disponible en esta plataforma",
  };
};

export const getFacebookData = async () => {
  return {
    cancelled: false,
    error: true,
    userData: null,
    message: "Auth social no disponible en esta plataforma",
  };
};

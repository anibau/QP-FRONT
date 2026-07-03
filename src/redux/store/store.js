import { configureStore } from '@reduxjs/toolkit';
import Reducers from '../reducers'; // ajusta el path si es necesario

export const store = configureStore({
  reducer: Reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

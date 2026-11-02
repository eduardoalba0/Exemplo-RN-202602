import { configureStore } from '@reduxjs/toolkit';
import usuarioReducer from './src/slices/usuarioSlice';

export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usuarioLogado: null,
  loading: false,
};

export const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: { usuarioLogado: null },
  reducers: {
    setUsuarioLogado: (state, action) => {
      state.usuarioLogado = action.payload;
    },
  },
});

export const { setUsuarioLogado } = usuarioSlice.actions;

export default usuarioSlice.reducer;

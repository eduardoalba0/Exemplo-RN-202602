import { createSlice } from "@reduxjs/toolkit";

export const usuarioLogadoSlice = createSlice({
    name: "usuarioLogado",
    initialState: { usuarioLogado: null },
    reducers: {
        setUsuarioLogado: (state, action) => {
            state.usuarioLogado = action.payload;
        },
        removerUsuarioLogado: (state, action) => {
            state.usuarioLogado = null
        }
        // Outras funções de manipulação e acesso deste slice
    }
})

export const { setUsuarioLogado, removerUsuarioLogado } = usuarioLogadoSlice.actions
export default usuarioLogadoSlice.reducer
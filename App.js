import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-init";
import LoginStackNavigator from "./src/components/LoginStackNavigator";
import DrawerNavigator from "./src/components/DrawerNavigator";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { removerUsuarioLogado, setUsuarioLogado } from "./src/slices/usuarioLogadoSlice";
import useAuthService from "./src/services/loginService";

export default function App() {
  const dispatch = useDispatch()
  const usuarioLogado = useSelector((state) => state.usuarioLogado?.usuarioLogado)
  const { buscarUsuario } = useAuthService()

  async function registerOnAuthStateChanged() {
    onAuthStateChanged(auth, (usuario) => {
      if (usuario && usuario.emailVerified) {
        const usuarioBusca = buscarUsuario(usuario.uid)
        if (usuarioBusca) {
          dispatch(setUsuarioLogado(usuarioBusca))
        } else {
          alert("Dados não localizados no banco. Tente novamente mais tarde.")
        }
      } else {
        dispatch(removerUsuarioLogado())
      }
    })
  }

  useEffect(() => {
    registerOnAuthStateChanged()
  }, [])

  async function deslogar() {
    try {
      await signOut(auth)
    } catch (err) {
      alert("Erro ao deslogar.")
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          {usuarioLogado ? <DrawerNavigator deslogar={deslogar} /> : <LoginStackNavigator />}
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}
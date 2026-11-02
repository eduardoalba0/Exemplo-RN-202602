import 'react-native-gesture-handler';
import DrawerNavigator from "./src/components/DrawerNavigator";
import LoginStackNavigator from './src/components/LoginStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-init';
import { useDispatch, useSelector } from 'react-redux';
import { setUsuarioLogado } from './src/slices/usuarioSlice';
import { UsuarioRepository } from './src/repositories/UsuarioRepository';

export default function App() {
  const dispatch = useDispatch();
  const usuarioLogado = useSelector((state) => state.usuario.usuarioLogado);

  async function registrarOnAuthChanged() {
    onAuthStateChanged(auth, async (usuario) => {
      if (usuario && usuario.emailVerified) {
        const usuarioAutenticado = await new UsuarioRepository().buscarId(usuario.uid);
        dispatch(setUsuarioLogado(usuarioAutenticado));
      } else {
        dispatch(setUsuarioLogado(null));
      }
    });
  }

  async function logout() {
    await auth.signOut();
  }

  useEffect(() => {
    registrarOnAuthChanged();
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <PaperProvider>
          {
            usuarioLogado ?
              <DrawerNavigator handleLogout={logout} />
              :
              <LoginStackNavigator />
          }
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

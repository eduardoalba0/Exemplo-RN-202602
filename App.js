import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/components/DrawerNavigator";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-init';
import LoginStackNavigator from './src/components/LoginStackNavigator';

export default function App() {

  const [usuarioLogado, setUsuarioLogado] = useState(null);


  async function registrarOnAuthChanged() {
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUsuarioLogado(usuario);
      } else {
        setUsuarioLogado(null);
      }
    })
  }

  async function logout() {
    auth.signOut();
  }

  useEffect(() => {
    registrarOnAuthChanged();
  }, [])

  return (
    <GestureHandlerRootView>
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

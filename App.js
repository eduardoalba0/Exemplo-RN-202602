import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-init";
import LoginStackNavigator from "./src/components/LoginStackNavigator";
import DrawerNavigator from "./src/components/DrawerNavigator";

export default function App() {

  const [usuarioLogado, setUsuarioLogado] = useState(null)

  async function registerOnAuthStateChanged() {
    onAuthStateChanged(auth, (usuario) => {
      setUsuarioLogado(usuario)
    })
  }

  useEffect(() => {
    registerOnAuthStateChanged()
  }, [])

  return (
    <NavigationContainer>
      <PaperProvider>
        {usuarioLogado ? <DrawerNavigator /> : <LoginStackNavigator />}
      </PaperProvider>
    </NavigationContainer>
  );
}
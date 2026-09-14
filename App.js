import { PaperProvider } from "react-native-paper";
import PageTarefas from "./src/pages/PageTarefas";
import PageContador from "./src/pages/PageContador";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator
          initialRouteName="Contador"
        >
          <Stack.Screen name="Contador"
            component={PageContador}
          />
          <Stack.Screen name="Tarefas"
            component={PageTarefas}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
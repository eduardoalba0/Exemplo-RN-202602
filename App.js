import { PaperProvider } from "react-native-paper";
import PageTarefas from "./src/pages/PageTarefas";
import PageContador from "./src/pages/PageContador";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
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
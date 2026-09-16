import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PageTarefas from "./src/pages/PageTarefas";
import PageContador from "./src/pages/PageContador";
import PageConsultaDolar from "./src/pages/PageConsultaDolar";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Tabs.Navigator
          initialRouteName="Contador"
        >
          <Tabs.Screen name="Contador"
            component={PageContador}
            options={{
              tabBarIcon: () => <FontAwesome5 name="calculator" color="black" />
            }}
          />
          <Tabs.Screen name="Tarefas"
            component={PageTarefas}
            options={{
              tabBarIcon: () => <FontAwesome5 name="list" color="black" />
            }}
          />
        </Tabs.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
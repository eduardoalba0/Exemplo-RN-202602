import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PageContador from "../pages/PageContador";
import PageTarefas from "../pages/PageTarefas";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tabs = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tabs.Navigator
            initialRouteName="Contador"
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen name="Contador" component={PageContador}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="123" size={24} color="black" />
                    ),
                }}
            />
            <Tabs.Screen name="Tarefas" component={PageTarefas}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="task" size={24} color="black" />
                    ),
                }}
            />
        </Tabs.Navigator>
    )
}

export default TabNavigator;


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Início" component={TabNavigator} />
        </Stack.Navigator>
    )
}

export default MainStackNavigator;
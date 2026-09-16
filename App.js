import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/components/DrawerNavigator";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <PaperProvider>
          <DrawerNavigator />
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
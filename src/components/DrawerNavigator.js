import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import PageIFPR from "../pages/PageIFPR";

const Drawer = createDrawerNavigator();

function DrawerNavigator(drawerProps) {

    function DrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Sair"
                    icon={() => <MaterialIcons name="logout" size={24} color="red" />}
                    onPress={() => props.deslogar()}
                />
            </DrawerContentScrollView>
        )
    }

    return (
        <Drawer.Navigator
            drawerContent={(navProps) =>
                <DrawerContent
                    {...navProps}
                    deslogar={() => drawerProps.deslogar()}
                />}
        >
            <Drawer.Screen name="Início" component={StackNavigator}
                options={{
                    drawerIcon: () => <Ionicons name="home" size={24} color="blue" />
                }} />
            <Drawer.Screen name="IFPR" component={PageIFPR} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
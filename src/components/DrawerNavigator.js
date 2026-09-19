import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import MainStackNavigator from './MainStackNavigator';

const Drawer = createDrawerNavigator();


function DrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                icon={() => (
                    <MaterialIcons name='logout' size={24} color='red' />
                )}
                onPress={() => props.handleLogout()}
            />
        </DrawerContentScrollView>
    )
}

function DrawerNavigator(props) {

    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={(navProps) => <DrawerContent {...navProps} handleLogout={props.handleLogout} />}>
            <Drawer.Screen name="Home" component={MainStackNavigator}
                options={{
                    drawerLabel: "Início",
                    headerTitle: "Início",
                    drawerIcon: () => (
                        <MaterialIcons name='home' size={24} color="black" />
                    )
                }}
            />
        </Drawer.Navigator >
    )
}

export default DrawerNavigator;
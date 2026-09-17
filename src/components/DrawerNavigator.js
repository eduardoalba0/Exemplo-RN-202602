import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import { MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={StackNavigator}
                options={{
                    drawerIcon: () => (
                        <MaterialIcons name='home' size={24} color="black" />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
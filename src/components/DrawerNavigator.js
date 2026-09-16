import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName='Principal'>
            <Drawer.Screen name="Principal" component={StackNavigator} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
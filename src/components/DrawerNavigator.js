import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import MainStackNavigator from './MainStackNavigator';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Text, Avatar } from 'react-native-paper';

const Drawer = createDrawerNavigator();
function DrawerContent(props) {
    const usuarioLogado = useSelector((state) => state.usuario?.usuarioLogado);
    const nome = usuarioLogado ? usuarioLogado.getNome() : '';
    const email = usuarioLogado ? usuarioLogado.getEmail() : '';

    return (
        <DrawerContentScrollView {...props}>
            {usuarioLogado && (
                <View>
                    <Avatar.Text
                        size={48}
                        label={nome.length >= 2 ? nome.substring(0, 2).toUpperCase() : 'US'}
                    />
                    <View>
                        <Text variant="titleMedium">{nome}</Text>
                        <Text variant="bodySmall">{email}</Text>
                    </View>
                </View>
            )}
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
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";
import { createUsuario } from "../types/Usuario";

function PageLogin() {
    const [usuario, setUsuario] = useState(createUsuario());
    const [loading, setLoading] = useState(false);

    const { loginEmailSenha } = useAuthService();
    const navigation = useNavigation();

    async function logar() {
        setLoading(true);
        try {
            await loginEmailSenha(usuario)
        } catch (e) {
            console.error(e)
            alert("Falha ao realizar login. Tente novamente mais tarde.")
        } finally {
            setLoading(false);
        }
    }


    return (
        <ScrollView>
            <Card>
                <Card.Title>Login</Card.Title>
                <Card.Content>
                    <TextInput
                        label="E-mail"
                        value={usuario.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => setUsuario({ ...usuario, email: text })}
                    />
                    <TextInput
                        label="Senha"
                        value={usuario.senha}
                        secureTextEntry={true}
                        onChangeText={text => setUsuario({ ...usuario, senha: text })}
                    />
                    <Button onPress={() => navigation.navigate("Cadastro")}>Cadastrar</Button>
                    <Button loading={loading} onPress={() => logar()}>Login</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageLogin;

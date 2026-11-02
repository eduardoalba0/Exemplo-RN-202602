import { useState } from "react";
import { ScrollView } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";
import { Usuario } from "../models/Usuario";
import { useDispatch } from "react-redux";
import { setUsuarioLogado } from "../slices/usuarioSlice";

function PageLogin() {
    const [usuario, setUsuario] = useState(new Usuario());
    const [loading, setLoading] = useState(false);

    const { loginEmailSenha, recuperarSenha } = useAuthService();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    function handleOnChangeText(campo, texto) {
        const novoUsuario = new Usuario({
            ...usuario,
            [campo]: texto
        })
        setUsuario(novoUsuario);
    }

    async function logar() {
        setLoading(true);
        try {
            const usuarioAutenticado = await loginEmailSenha(usuario);
            dispatch(setUsuarioLogado(usuarioAutenticado));
        } catch (e) {
            switch (e.code) {
                case 'auth/invalid-credential':
                    alert("E-mail ou senha incorretos.");
                    break;
                case 'auth/user-disabled':
                    alert("Esta conta foi desativada. Entre em contato com o suporte.");
                    break;
                case 'auth/too-many-requests':
                    alert("Muitas tentativas falhas. Tente novamente mais tarde.");
                    break;
                case 'auth/network-request-failed':
                    alert("Sem conexão com a internet.");
                    break;
                default:
                    alert(e.message)
            }
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
                        value={usuario.getEmail()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => handleOnChangeText("email", text)}
                    />
                    <TextInput
                        label="Senha"
                        value={usuario.getSenha()}
                        secureTextEntry={true}
                        onChangeText={text => handleOnChangeText("senha", text)}
                    />
                    <Button onPress={() => navigation.navigate("Cadastro")}>Cadastrar</Button>
                    <Button loading={loading} onPress={() => logar()}>Login</Button>
                    <Button onPress={() => recuperarSenha(usuario.email)}>Recuperar Senha</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageLogin;

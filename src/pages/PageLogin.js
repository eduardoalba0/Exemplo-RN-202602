import { ScrollView } from "react-native";
import { Button, Text, TextInput, Card } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Usuario from "../models/Usuario";

function PageLogin() {
    const [usuario, setUsuario] = useState(new Usuario())
    const [secureText, setSecureText] = useState(true)
    const [loading, setLoading] = useState(false)
    const { loginEmailSenha, recuperarSenha } = useAuthService()
    const navigation = useNavigation()

    function handleOnChangeText(campo, texto) {
        const novoUsuario = new Usuario({
            ...usuario,
            [campo]: texto
        })
        setUsuario(novoUsuario)
    }

    async function logarUsuario() {
        try {
            setLoading(true)
            await loginEmailSenha(usuario)
            alert("Logado com sucesso!")
        } catch (err) {
            console.error(err)
            alert("Erro ao logar")
        } finally {
            setLoading(false)
        }
    }

    async function recuperarSenhaUsuario() {
        try {
            setLoading(true)
            await recuperarSenha(usuario)
            alert("Um e-mail foi enviado para recuperar sua senha.")
        } catch (err) {
            console.error(err)
            alert("Erro ao recuperar senha.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            <Card>
                <Card.Content>
                    <TextInput
                        label="E-mail:"
                        placeholder="Insira o seu e-mail."
                        value={usuario.getEmail()}
                        onChangeText={(text) => handleOnChangeText("email", text)}
                    />
                    <TextInput
                        label="Senha:"
                        placeholder="Insira a sua senha."
                        value={usuario.getSenha()}
                        secureTextEntry={secureText}
                        onChangeText={(text) => handleOnChangeText("senha", text)}
                        right={
                            <TextInput.Icon
                                icon="eye"
                                onPress={() => setSecureText(!secureText)}
                            />
                        }
                    />
                    <Button loading={loading}
                        onPress={() => logarUsuario()}>
                        Entrar
                    </Button>
                    <Text>Esqueceu a sua senha?</Text>
                    <Button loading={loading}
                        onPress={() => recuperarSenhaUsuario()}>
                        Recuperar Senha</Button>
                    <Text>Não tem cadastro?</Text>
                    <Button onPress={() => navigation.navigate("Cadastro")}>Cadastrar</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageLogin;
import { ScrollView } from "react-native";
import { Button, Text, TextInput, Card } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useState } from "react";

function PageLogin() {
    const [usuario, setUsuario] = useState({})
    const [secureText, setSecureText] = useState(true)
    const [loading, setLoading] = useState(false)
    const { loginEmailSenha, recuperarSenha } = useAuthService()

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
                        value={usuario.email}
                        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
                    />
                    <TextInput
                        label="Senha:"
                        placeholder="Insira a sua senha."
                        value={usuario.senha}
                        secureTextEntry={secureText}
                        onChangeText={(text) => setUsuario({ ...usuario, senha: text })}
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
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageLogin;
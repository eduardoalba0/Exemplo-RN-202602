import { ScrollView } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";

function PageCadastro() {

    const [usuario, setUsuario] = useState({})
    const [secureText, setSecureText] = useState(true)
    const [loading, setLoading] = useState(false)
    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();

    async function cadastrarUsuario() {
        try {
            setLoading(true)
            await cadastrarEmailSenha(usuario)
            alert("Cadastro realizado com sucesso!")
        } catch (err) {
            console.error(err)
            alert("Erro ao cadastrar, tente novamente mais tarde.")
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
                    <Button loading={loading} onPress={() => cadastrarUsuario()}>Cadastrar</Button>
                    <Text>Já possui uma conta?</Text>
                    <Button onPress={() => navigation.navigate("Login")} >Entrar</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )

}

export default PageCadastro;
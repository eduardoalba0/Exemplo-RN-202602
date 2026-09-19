import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";
import { createUsuario } from "../types/Usuario";

function PageCadastro() {
    const [usuario, setUsuario] = useState(createUsuario());
    const [loading, setLoading] = useState(false);

    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();


    async function cadastrar() {
        setLoading(true);
        try {
            await cadastrarEmailSenha(usuario)
        } catch (e) {
            console.error(e)
            alert("Erro ao cadastrar. Tente novamente mais tarde.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView>
            <Card>
                <Card.Title>Cadastro</Card.Title>
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
                    <Button loading={loading} onPress={() => cadastrar()}>Cadastrar</Button>
                    <Button onPress={() => navigation.navigate("Login")}>Login</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageCadastro;

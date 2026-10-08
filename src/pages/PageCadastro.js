import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";
import { Usuario } from "../models/Usuario";

function PageCadastro() {
    const [usuario, setUsuario] = useState(new Usuario());
    const [loading, setLoading] = useState(false);

    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();


    async function cadastrar() {
        setLoading(true);
        try {
            await cadastrarEmailSenha(usuario)
            navigation.navigate("Login")
            alert("Usuário cadastrado com sucesso! Um e-mail foi enviado para confirmação.")
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert("Este e-mail já está cadastrado. Tente fazer login ou recuperar sua senha.");
            } else if (e.code === 'auth/invalid-email') {
                alert("O formato do e-mail digitado é inválido.");
            } else if (e.code === 'auth/weak-password') {
                alert("A senha deve ter pelo menos 6 caracteres.");
            } else {
                alert("Erro ao cadastrar. Tente novamente mais tarde.");
            }
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
                        label="Nome"
                        value={usuario.nome}
                        keyboardType="text"
                        autoCapitalize="none"
                        onChangeText={text => setUsuario(new Usuario({ ...usuario, nome: text }))}
                    />
                    <TextInput
                        label="E-mail"
                        value={usuario.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => setUsuario(new Usuario({ ...usuario, email: text }))}
                    />
                    <TextInput
                        label="Senha"
                        value={usuario.senha}
                        secureTextEntry={true}
                        onChangeText={text => setUsuario(new Usuario({ ...usuario, senha: text }))}
                    />
                    <Button loading={loading} onPress={() => cadastrar()}>Cadastrar</Button>
                    <Button onPress={() => navigation.navigate("Login")}>Login</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageCadastro;

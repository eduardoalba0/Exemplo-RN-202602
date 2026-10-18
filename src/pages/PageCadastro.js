import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";
import { Usuario } from "../models/Usuario";
import { Endereco } from "../models/Endereco";

function PageCadastro() {
    const [usuario, setUsuario] = useState(new Usuario());
    const [endereco, setEndereco] = useState(new Endereco());
    const [loading, setLoading] = useState(false);

    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();

    function handleSetUsuario(campo, valor) {
        const novoUsuario = new Usuario({
            ...usuario,
            [campo]: valor
        })
        setUsuario(novoUsuario);
    }

    function handleSetEndereco(campo, valor) {
        const novoEndereco = new Endereco({
            ...endereco,
            [campo]: valor
        })
        setEndereco(novoEndereco);
    }

    async function cadastrar() {
        setLoading(true);
        try {
            const usuarioCompleto = new Usuario({
                ...usuario,
                endereco: endereco
            });
            await cadastrarEmailSenha(usuarioCompleto);
            navigation.navigate("Login");
            alert("Usuário cadastrado com sucesso! Um e-mail foi enviado para confirmação.");
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
                        value={usuario.getNome()}
                        keyboardType="text"
                        autoCapitalize="none"
                        onChangeText={text => handleSetUsuario("nome", text)}
                    />
                    <TextInput
                        label="CEP"
                        value={endereco.getCep()}
                        keyboardType="numeric"
                        maxLength={8}
                        autoCapitalize="none"
                        onChangeText={text => handleSetEndereco("cep", text)}
                    />
                    <TextInput
                        label="Logradouro"
                        value={endereco.getLogradouro()}
                        keyboardType="text"
                        autoCapitalize="none"
                        onChangeText={text => handleSetEndereco("logradouro", text)}
                    />

                    <TextInput
                        label="E-mail"
                        value={usuario.getEmail()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => handleSetUsuario("email", text)}
                    />
                    <TextInput
                        label="Senha"
                        value={usuario.getSenha()}
                        secureTextEntry={true}
                        onChangeText={text => handleSetUsuario("senha", text)}
                    />
                    <Button loading={loading} onPress={() => cadastrar()}>Cadastrar</Button>
                    <Button onPress={() => navigation.navigate("Login")}>Login</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageCadastro;

import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";

function PageCadastro() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const { cadastrarEmailSenha } = useAuthService();
    const navigation = useNavigation();

    return (
        <ScrollView>
            <Card>
                <Card.Title>Login</Card.Title>
                <Card.Content>
                    <TextInput
                        label="E-mail"
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        label="Senha"
                        value={senha}
                        secureTextEntry={true}
                        onChangeText={text => setSenha(text)}
                    />
                    <Button onPress={() => cadastrarEmailSenha(email, senha)}>Cadastrar</Button>
                    <Button onPress={() => navigation.navigate("Login")}>Login</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageCadastro;

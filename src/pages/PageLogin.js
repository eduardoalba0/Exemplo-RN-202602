import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/loginService";
import { useNavigation } from "@react-navigation/native";

function PageLogin() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const { loginEmailSenha } = useAuthService();
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
                    <Button onPress={() => navigation.navigate("Cadastro")}>Cadastrar</Button>
                    <Button onPress={() => loginEmailSenha(email, senha)}>Login</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default PageLogin;

import {
    createUserWithEmailAndPassword, // Função importada para criar o usuário
    signInWithEmailAndPassword, // Função importada para o login
    sendPasswordResetEmail, // Função importada para redefinição de senha
    sendEmailVerification, // Função importada para verificar o e-mail
    signOut
} from 'firebase/auth';
import { auth } from '../../firebase-init';

function useAuthService() {

    const cadastrarEmailSenha = async (usuario) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, usuario.email, usuario.senha);
            await sendEmailVerification(userCredential.user); // Se você precisa de confirmação de e-mail
            await signOut(auth); // Desloga o usuário após o cadastro
        } catch (error) {
            throw error;
        }
    }

    const loginEmailSenha = async (usuario) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, usuario.email, usuario.senha);
            return userCredential
        } catch (error) {
            throw error;
        }
    }

    const recuperarSenha = async (usuario) => {
        try {
            await sendPasswordResetEmail(auth, usuario.email);
        } catch (error) {
            throw error;
        }
    }

    return { cadastrarEmailSenha, loginEmailSenha, recuperarSenha };
}

export default useAuthService;
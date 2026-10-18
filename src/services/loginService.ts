import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut
} from 'firebase/auth';
import { auth } from '../../firebase-init';
import { Usuario } from '../models/Usuario';
import { UsuarioRepository } from '../repositories/UsuarioRepository';

const repository = new UsuarioRepository();

function useAuthService() {

    const cadastrarEmailSenha = async (usuario: Usuario): Promise<void> => {
        try {
            if (!usuario.getSenha()) throw new Error("Senha é obrigatória para o cadastro.");

            const userCredential = await createUserWithEmailAndPassword(auth, usuario.getEmail(), usuario.getSenha());
            usuario.id = userCredential.user.uid;

            await repository.salvar(usuario);

            await sendEmailVerification(userCredential.user);
            await signOut(auth);

        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const loginEmailSenha = async (usuario: Usuario): Promise<Usuario> => {
        try {
            if (!usuario.getSenha()) throw new Error("Senha é obrigatória para o login.");

            const userCredential = await signInWithEmailAndPassword(auth, usuario.getEmail(), usuario.getSenha());

            if (!userCredential.user.emailVerified) {
                await signOut(auth);
                throw new Error("Confirme seu e-mail através do link enviado antes de acessar o aplicativo.");
            }

            const usuarioAutenticado = await repository.buscarId(userCredential.user.uid);

            if (usuarioAutenticado) {
                return usuarioAutenticado;
            } else {
                throw new Error("Dados do usuário não encontrados no banco de dados.");
            }
        } catch (error) {
            throw error;
        }
    }

    const recuperarSenha = async (email: string): Promise<void> => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    }

    return { cadastrarEmailSenha, loginEmailSenha, recuperarSenha };
}

export default useAuthService;
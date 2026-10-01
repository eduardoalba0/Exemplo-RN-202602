import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail, // Função importada para redefinição de senha
    sendEmailVerification,
    signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../firebase-init';
import { Usuario, usuarioConverter } from '../models/Usuario';

const COLLECTION_NAME = "Usuarios";
const usuariosCollection = collection(db, COLLECTION_NAME).withConverter(usuarioConverter)

function useAuthService() {

    const cadastrarEmailSenha = async (usuario: Usuario): Promise<void> => {
        try {
            if (!usuario.senha) throw new Error("Senha é obrigatória para o cadastro.");

            const userCredential = await createUserWithEmailAndPassword(auth, usuario.email, usuario.senha);
            usuario.id = userCredential.user.uid;

            const docRef = doc(usuariosCollection, usuario.id);
            await setDoc(docRef, usuario);

            await sendEmailVerification(userCredential.user);
            await signOut(auth);

        } catch (error) {
            throw error;
        }
    }

    const loginEmailSenha = async (usuario: Usuario): Promise<Usuario> => {
        try {
            if (!usuario.senha) throw new Error("Senha é obrigatória para o login.");

            const userCredential = await signInWithEmailAndPassword(auth, usuario.email, usuario.senha);

            if (!userCredential.user.emailVerified) {
                await signOut(auth);
                throw new Error("Confirme seu e-mail através do link enviado antes de acessar o aplicativo.");
            }

            const uid = userCredential.user.uid;
            const docRef = doc(usuariosCollection, uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
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
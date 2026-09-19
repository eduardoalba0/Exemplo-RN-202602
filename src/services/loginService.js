import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-init';

const COLLECTION_NAME = "Usuarios"

function useAuthService() {

    /**
     * @param {import('../types/Usuario').Usuario} usuario 
     */
    const cadastrarEmailSenha = async (usuario) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, usuario.email, usuario.senha);
            usuario.id = userCredential.user.uid;
            const { senha, ...dados } = usuario;
            const docRef = doc(db, COLLECTION_NAME, usuario.id);
            await setDoc(docRef, dados);
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param {import('../types/Usuario').Usuario} usuario 
     */
    const loginEmailSenha = async (usuario) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, usuario.email, usuario.senha);
            console.log("Usuário logado:", userCredential.user.uid);
            return userCredential;
        } catch (error) {
            throw error;
        }
    }

    return { cadastrarEmailSenha, loginEmailSenha }

}

export default useAuthService;

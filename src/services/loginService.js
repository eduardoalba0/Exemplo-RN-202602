import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-init';

function useAuthService() {

    const cadastrarEmailSenha = async (email, senha) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            console.log(userCredential)
        } catch (error) {
            console.error(error);
            alert("Falha ao cadastrar. Tente novamente mais tarde.")
        }
    }

    const loginEmailSenha = async (email, senha) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            console.log(userCredential)
        } catch (error) {
            console.error(error);
            alert("Falha ao logar. Tente novamente mais tarde.")
        }
    }

    return { cadastrarEmailSenha, loginEmailSenha }

}

export default useAuthService;

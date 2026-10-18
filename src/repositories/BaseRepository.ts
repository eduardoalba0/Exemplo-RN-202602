import { collection, CollectionReference, setDoc, doc, addDoc, getDoc, getDocs, deleteDoc, where, query, WhereFilterOp } from "firebase/firestore"
import { db } from "../../firebase-init"
import BaseModel from "../models/BaseModel"
import firebaseConverter from "../converters/firebaseConverter"

export abstract class BaseRepository<T extends BaseModel> {
    private collectionRef: CollectionReference

    constructor(collectionName: string, ModelClass: new () => T) {
        const converter = firebaseConverter<T>(ModelClass);
        this.collectionRef = collection(db, collectionName).withConverter(converter);
    }

    async salvar(entidade: T): Promise<T> {
        if (entidade.id) {
            const docRef = doc(this.collectionRef, entidade.id);
            await setDoc(docRef, entidade);
            return entidade;
        } else {
            await addDoc(this.collectionRef, entidade)
            return entidade;
        }
    }

    async buscarId(id: string): Promise<T | null> {
        const docRef = doc(this.collectionRef, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() as T : null;
    }

    async buscarPorCampo(campo: string, operador: WhereFilterOp, valor: any): Promise<T[]> {
        const q = query(this.collectionRef, where(campo, operador, valor));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data()) as T[];
    }

    async listarTodos(): Promise<T[]> {
        const snapshot = await getDocs(this.collectionRef);
        return snapshot.docs.map(doc => doc.data()) as T[];
    }

    async deletar(id: string): Promise<void> {
        const docRef = doc(this.collectionRef, id);
        await deleteDoc(docRef);
    }

}
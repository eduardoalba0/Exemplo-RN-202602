import BaseModel from "../models/BaseModel";

// <> é uma implementaçao de generics no javascript
// generics é uma forma de definirmos o "tipo"/classe em tempo de execuçao
// Neste caso, T estende BaseModel,
// e ModelClass é uma entrada que recebe a própria classe 
function firebaseConverter<T extends BaseModel>(ModelClass: new () => T): any {
    // Conversor de classe para um objeto plano do firestore
    function toFirestore(value: BaseModel): any {
        value.toFirestore()
    }

    // Conversor de objeto plano do firestore para uma classe
    function fromFirestore(snapshot: any, options: any): T {
        // cria um objeto do tipo informado na entrada do firebaseConverter
        return new ModelClass().fromFirestore(snapshot, options) as T
    }

    return { toFirestore, fromFirestore }
}

export default firebaseConverter
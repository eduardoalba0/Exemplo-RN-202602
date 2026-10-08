import BaseModel from '../models/BaseModel';

export const createConverter = <T extends BaseModel>(EntityClass: new () => T) => ({
    toFirestore: (dados: T): object => dados.toFirestore(),
    fromFirestore: (snapshot: any, options: any): T => {
        return new EntityClass().fromFirestore(snapshot, options) as T
    }
});
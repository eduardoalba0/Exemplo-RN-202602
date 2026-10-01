export default class BaseModel {
    id: string | null;
    criadoEm: Date;
    atualizadoEm: Date;

    constructor(dados: Partial<BaseModel> = {}) {
        this.id = dados.id || null;
        this.criadoEm = dados.criadoEm || new Date();
        this.atualizadoEm = dados.atualizadoEm || new Date();
    }

    paraObjetoPuro(): Record<string, any> {
        const { id, ...dados } = this;
        return dados;
    }
}

export const baseConverter = <T>() => ({
    toFirestore: (dados: T): Record<string, any> => {
        return { ...dados };
    },
    fromFirestore: (snapshot: any, options: any): T => {
        const dados = snapshot.data(options);

        return {
            id: snapshot.id,
            ...dados,
            criadoEm: dados.criadoEm?.toDate(),
            atualizadoEm: dados.atualizadoEm?.toDate()
        } as T;
    }
});
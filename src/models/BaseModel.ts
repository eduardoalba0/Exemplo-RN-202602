export default abstract class BaseModel {
    id: string | null;
    criadoEm: Date;
    atualizadoEm: Date;

    constructor(dados?: Partial<BaseModel>) {
        this.id = dados?.id || null;
        this.criadoEm = new Date();
        this.atualizadoEm = new Date();
    }

    toFirestore(): any {
        const { id, ...dados } = this;
        return dados;
    }

    fromFirestore(snapshot: any, options: any): BaseModel {
        const dados = snapshot.data(options);
        this.id = snapshot.id;
        this.criadoEm = dados.criadoEm?.toDate();
        this.atualizadoEm = dados.atualizadoEm?.toDate()
        return this;
    }

}

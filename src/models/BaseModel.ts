export default abstract class BaseModel {
    private id: string | null;
    private criadoEm: Date;
    private atualizadoEm: Date;

    constructor(dados?: any) {
        this.id = dados?.id || null;
        this.criadoEm = new Date();
        this.atualizadoEm = new Date();
    }

    toFirestore(): any {
        const { ...dados } = this;
        return dados;
    }

    fromFirestore(snapshot: any, options?: any): BaseModel {
        const dados = snapshot.data(options);
        this.id = snapshot.id;
        this.criadoEm = dados.criadoEm?.toDate();
        this.atualizadoEm = dados.atualizadoEm?.toDate()
        return this;
    }

    getId(): string {
        return this.id;
    }

    getCriadoEm(): Date {
        return this.criadoEm;
    }

    getAtualizadoEm(): Date {
        return this.atualizadoEm;
    }
}

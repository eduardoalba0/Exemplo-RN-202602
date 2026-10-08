import BaseModel from './BaseModel';

export class Usuario extends BaseModel {
    nome: string;
    email: string;
    senha: string;

    constructor(dados?: Partial<Usuario>) {
        super(dados);
        this.nome = dados?.nome || null
        this.email = dados?.email || null
        this.senha = dados?.senha || null
    }

    override toFirestore(): any {
        const { senha, ...dadosPuros } = this;
        return dadosPuros;
    }
}
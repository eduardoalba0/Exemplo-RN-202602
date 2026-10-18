import BaseModel from './BaseModel';
import { Endereco } from './Endereco';

export class Usuario extends BaseModel {
    private nome: string;
    private email: string;
    private senha: string;
    private endereco: Endereco;

    constructor(dados?: any) {
        super(dados);
        this.nome = dados?.nome || null
        this.email = dados?.email || null
        this.senha = dados?.senha || null
        this.endereco = dados?.endereco || new Endereco()
    }

    override toFirestore(): any {
        const { senha, ...dadosPuros } = this;
        return {
            ...dadosPuros,
            endereco: this.endereco.toFirestore()
        };
    }

    override fromFirestore(snapshot: any, options?: any): Usuario {
        super.fromFirestore(snapshot, options);
        const dados = snapshot.data(options);
        this.nome = dados.nome;
        this.email = dados.email;
        this.senha = dados.senha;
        this.endereco = new Endereco(dados.endereco)
        return this;
    }

    getNome(): string {
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

    getSenha(): string {
        return this.senha;
    }

    getEndereco(): Endereco {
        return this.endereco;
    }

}
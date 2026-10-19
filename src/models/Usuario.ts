import BaseModel from "./BaseModel";

export default class Usuario extends BaseModel {

    private nome: string;
    private email: string;
    private senha: string;

    constructor(dados?: any) {
        super(dados) // Chama o construtor da BaseModel
        this.nome = dados?.nome || null
        this.email = dados?.email || null
        this.senha = dados?.senha || null
    }


    override toFirestore(): any {
        const { senha, ...dados } = this
        return dados
    }

    override fromFirestore(snapshot, options): Usuario {
        super.fromFirestore(snapshot, options)
        const dados = snapshot.data(options)
        this.nome = dados.nome
        this.email = dados.email
        return this
    }

    getNome() {
        return this.nome
    }
    getEmail() {
        return this.email
    }
    getSenha() {
        return this.senha
    }

}
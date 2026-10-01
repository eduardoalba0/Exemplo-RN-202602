import BaseModel from './BaseModel';

export class Usuario extends BaseModel {
    nome: string;
    email: string;
    senha: string;

    constructor(dados: Partial<Usuario> = {}) {
        super(dados);
        this.nome = dados.nome;
        this.email = dados.email;
        this.senha = dados.senha;
    }
}

export const usuarioConverter = {
    toFirestore: (usuario: Usuario) => {
        const { senha, ...usuarioObjeto } = usuario;
        return usuarioObjeto;
    },
    fromFirestore: (snapshot: any, options: any): Usuario => {
        const dados = snapshot.data(options);

        return new Usuario({
            id: snapshot.id,
            nome: dados.nome,
            email: dados.email,
            criadoEm: dados.criadoEm?.toDate(),
            atualizadoEm: dados.atualizadoEm?.toDate()
        });
    }
};

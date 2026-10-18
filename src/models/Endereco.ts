export class Endereco {
    private cep: string
    private logradouro: string

    constructor(dados?: any) {
        this.cep = dados?.cep || null
        this.logradouro = dados?.logradouro || null
    }

    toFirestore(): any {
        const { ...dados } = this
        return dados;
    }

    getCep(): string {
        return this.cep;
    }

    getLogradouro(): string {
        return this.logradouro;
    }
}
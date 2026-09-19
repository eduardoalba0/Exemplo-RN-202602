import { createBaseModel } from "./BaseModel";

/**
 * @typedef {Object} Usuario
 * @property {string} nome
 * @property {string} email
 * @property {string} senha
 * @property {string} cpf
 */
export function createUsuario(initialData = {}) {
    return {
        ...createBaseModel(initialData),
        nome: initialData.nome ?? "",
        email: initialData.email ?? "",
        senha: initialData.senha ?? "",
        cpf: initialData.cpf ?? ""
    }
}

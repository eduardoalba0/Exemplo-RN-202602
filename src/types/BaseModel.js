/**
 * @typedef {Object} BaseModel
 * @property {string} id
 * @property {Date} dataCriacao
 * @property {Date} dataAtualizacao
 */
export function createBaseModel(initialData = {}) {
    return {
        id: initialData.id ?? "",
        dataCriacao: initialData.dataCriacao ?? new Date(),
        dataAtualizacao: initialData.dataAtualizacao ?? new Date()
    }
}
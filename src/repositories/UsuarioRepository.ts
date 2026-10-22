import Usuario from "../models/Usuario"
import { BaseRepository } from "./BaseRepository"

export default class UsuarioRepository
    extends BaseRepository<Usuario> {

    constructor() {
        super("Usuarios", Usuario)
    }
}
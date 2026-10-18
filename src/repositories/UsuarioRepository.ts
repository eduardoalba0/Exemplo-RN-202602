import { BaseRepository } from "./BaseRepository";
import { Usuario } from "../models/Usuario";

export class UsuarioRepository extends BaseRepository<Usuario> {
    constructor() {
        super("Usuarios", Usuario);
    }
}
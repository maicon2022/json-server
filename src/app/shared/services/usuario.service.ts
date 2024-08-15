import {Injectable} from '@angular/core';
import {Usuario} from "../model/usuario";
import {USUARIOS} from "../model/USUARIOS";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuarios = USUARIOS;

    constructor() {
    }

    inserir(usuario: Usuario) {
        this.validarMaiorIdade(usuario);
        this.validarIdsDiferentes(usuario);

        this.usuarios.push(usuario);
    }

    listar() {
        return this.usuarios;
    }

    remover(usuarioARemover: Usuario) {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== usuarioARemover.id);
    }

    private validarMaiorIdade(usuario: Usuario) {
        if (usuario.idade < 18) {
            throw new Error('Usuário nao pode ser menor!');
        }
    }

    private validarIdsDiferentes(usuario: Usuario) {
        const usuarioEncontrado = this.usuarios.find(u => u.id == usuario.id);
        if (usuarioEncontrado) {
            throw new Error('Usuário já cadastrado com ID!');
        }
    }
}

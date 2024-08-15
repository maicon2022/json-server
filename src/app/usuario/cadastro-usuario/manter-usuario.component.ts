import { Component } from '@angular/core';
import {Usuario} from "../../shared/model/usuario";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../shared/services/usuario.service";
import Swal from "sweetalert2";
import {MensagemSweetService} from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './manter-usuario.component.html',
  styleUrl: './manter-usuario.component.scss'
})
export class ManterUsuarioComponent {

  usuario = new Usuario('1', '', 0);
  modoEdicao = false;

  constructor(private roteador: Router, private rotaAtual: ActivatedRoute,
              private usuarioService: UsuarioService, private mensagemService: MensagemSweetService) {
    const idParaEdicao = rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      this.modoEdicao = true;
      const usuarioAEditar = usuarioService.listar().find(usuario => usuario.id == idParaEdicao);
      if (usuarioAEditar) {
        this.usuario = usuarioAEditar;
      }
    }
  }

  inserir() {
    if (!this.modoEdicao) {
      try {
        this.usuarioService.inserir(this.usuario);
        this.roteador.navigate(['listagem-usuarios']);
        this.mensagemService.sucesso('Usuário cadastrado com sucesso.');
      } catch (e: any){
        this.mensagemService.erro(e.message);
      }
    }
  }
}

import { Component } from '@angular/core';
import {Usuario} from "../../shared/model/usuario";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../shared/services/usuario.service";
import Swal from "sweetalert2";
import {MensagemSweetService} from "../../shared/services/mensagem-sweet.service";
import {UsuarioRestService} from "../../shared/services/usuario-rest.service";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './manter-usuario.component.html',
  styleUrl: './manter-usuario.component.scss'
})
export class ManterUsuarioComponent {

  usuario = new Usuario('1', '', 0);
  modoEdicao = false;

  constructor(private roteador: Router, private rotaAtual: ActivatedRoute,
              private usuarioService: UsuarioRestService, private mensagemService: MensagemSweetService) {

    this.usuarioService.listar().subscribe(usuarios => {
      if (usuarios && usuarios.length > 0) {
        const maiorId = Math.max(...usuarios.map(usuario => Number(usuario.id)));
        this.usuario.id = (maiorId + 1).toString();
      } else {
        // Se não houver usuários, o ID começa em 1
        this.usuario.id = '1';
      }
    })
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      this.modoEdicao = true;

      //const usuarioAEditar = usuarioService.listar().find(usuario => usuario.id == idParaEdicao);
      this.usuarioService.buscarPorId(idParaEdicao).subscribe(
        resposta => {
          if (resposta) {
            this.usuario = resposta;
          }
        }
      )
    }
  }

  inserir() {

    if (!this.modoEdicao) {
      try {
        this.usuarioService.inserir(this.usuario).subscribe(
          resposta => {
            this.roteador.navigate(['listagem-usuarios']);
            this.usuario = new Usuario('1', '', 0);
            this.mensagemService.sucesso('Usuário cadastrado com sucesso.');
          }
        )
      }
      catch (e: any) {
        this.mensagemService.erro(e.message);
      }
      }
    else {
      try {
        this.usuarioService.editar(this.usuario).subscribe(
          resposta => {
            this.roteador.navigate(['listagem-usuarios']);
            this.usuario = new Usuario('1', '', 0);
            this.mensagemService.sucesso('Usuário editado com sucesso.');
          }
        )
      }
      catch (e: any){
        this.mensagemService.erro(e.message);
      }
    }
  }

}

import { Injectable } from '@angular/core';
import {Usuario} from "../model/usuario";
import {HttpClient} from "@angular/common/http";
import {catchError, concatMap, map, Observable, of, switchMap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioRestService {

  URL_USUARIOS = 'http://localhost:3000/usuarios';
  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.URL_USUARIOS);
  }

  buscarPorId(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}/${id}`);
  }

  inserir(usuario: Usuario): Observable<Usuario> {
    this.validarMaiorIdade(usuario);
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario);
  }

  remover(id: string): Observable<object> {
    return this.httpClient.delete(`${this.URL_USUARIOS}/${id}`);
  }

  // recebe um usuário e quando atualiza, a resposta será que o bd devolverá o usuário alterado
  editar(usuario: Usuario): Observable<Usuario> {
    this.validarMaiorIdade(usuario);
    return this.httpClient.put<Usuario>(`${this.URL_USUARIOS}/${usuario.id}`, usuario);
  }

  private validarMaiorIdade(usuario: Usuario) {
    if (usuario.idade < 18) {
      throw new Error('Usuário nao pode ser menor de idade!');
    }
  }

}

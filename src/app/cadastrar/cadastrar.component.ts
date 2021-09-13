import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private Auth: AuthService,  //injeção de dependência, o módulo de cadastrar depende do AuthService 
    private router: Router
  ) { }

  ngOnInit() { //quando minha página iniciar, faça x, y, z
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.user.tipo = this.tipoUsuario

    if (this.user.nome.length < 5) {
      alert('preencha o campo nome com pelo menos 5 caracteres')
    }

    if (this.user.usuario.indexOf('@') == -1 || this.user.usuario.indexOf('.') == -1){ 
      alert('inserir um endereço de email válido')
    }

    if (this.user.senha.length < 8) {
      alert('preencha o campo com pelo menos 8 caracteres')
    } 
    if (this.user.senha != this.confirmarSenha) {
      alert('as senhas estão incorretas!')
    } else {
      this.Auth.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('usuário cadastrado com sucesso!')
      })
    }

  }


}

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: any[] = [];

  inputlogin = {
    username: '',
    password: ''
  };
  
  constructor(private storage: Storage, private router: Router) { }

  async ionViewWillEnter() {
    await this.storage.create(); // Cria o banco de dados

    this.storage.get('userdata')
      .then((userdata) => {
        if (userdata) {
          console.log('Dados recuperados:', userdata);
          this.userdata = userdata; // Armazena os dados recuperados em 'userdata'
        } else {
          console.log('Nenhum dado encontrado');
        }
      })
      .catch((error) => {
        console.error('Erro ao recuperar os dados:', error);
      });
  }
  
  ngOnInit() {
  }

  Login() {
    console.log('Dados guardados:', this.userdata);
    console.log('Dados introduzidos:', this.inputlogin);
    if (this.validateInput()) {
      if (this.checkCredentials()) {
        console.log('Sucesso');
        this.storage.set('username', this.inputlogin.username)
          .then(() => {
            console.log('Username armazenado com sucesso');
            this.router.navigateByUrl('/tabs/tab1');
          })
          .catch((error) => {
            console.error('Erro ao armazenar o username:', error);
          });
      } else {
        console.log('As credenciais introduzidas estão incorretas!');
      }
    } else {
      console.log('Nome de usuário ou palavra-passe inválidos!');
    }
  }

  validateInput() {
    return (
      this.inputlogin.username !== '' && this.inputlogin.password !== ''
    );
  }

  checkCredentials() {
    // Verificar se existe um par de nome de usuário e senha em comum
    return this.userdata.some((user) => user.username === this.inputlogin.username && user.password === this.inputlogin.password);
  }
}
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata = {
    fullname: '',
    email: '',
    username: '',
    password: ''
  };

  inputlogin = {
    username: '',
    password: ''
  };
  
  constructor(private storage: Storage) { }

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
    if (this.validateInput()) {
      if (this.checkCredentials()) {
        console.log('Sucesso');
      } else {
        console.log('Esse usuário não existe!');
      }
    } else {
      console.log('Nome de usuário ou palavra-passe inválidos!');
    }
  }

  validateInput() {
    console.log(this.inputlogin);
    return (
      this.inputlogin.username !== '' && this.inputlogin.password !== ''
    );
  }

  checkCredentials() {
    // Verificar se existe um par de nome de usuário e senha em comum
    return (
      this.userdata.username === this.inputlogin.username &&
      this.userdata.password === this.inputlogin.password
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userdata={
    fullname:'',
    email:'', 
    username:'',
    password:''
  }
  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  Register() {
    this.storage.create().then((storage) => {
      storage.get('userdata')
        .then((existingData) => {
          if (existingData) {
            if (Array.isArray(existingData)) {
              // Verifique se o usuário já existe no array existente
              const userExists = existingData.some((user) => user.username === this.userdata.username);
              if (!userExists) {
                // Adicione o novo usuário ao array existente
                existingData.push(this.userdata);
                return storage.set('userdata', existingData);
              } else {
                console.log('Esse usuário já existe!');
                return;
              }
            } else {
              // Se `existingData` não for um array, crie um novo array com os dados existentes e adicione o novo dado
              if (existingData.username === this.userdata.username) {
                console.log('Esse usuário já existe!');
                return;
              }
              return storage.set('userdata', [existingData, this.userdata]);
            }
          } else {
            return storage.set('userdata', [this.userdata]);
          }
        })
        .then(() => {
          console.log('Dados salvos com sucesso!');
          console.log(this.userdata);
        })
        .catch((error) => {
          console.error('Erro ao salvar os dados:', error);
        });
    });
  }
}
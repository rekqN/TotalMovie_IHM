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
              existingData.push(this.userdata);
              return storage.set('userdata', existingData);
            } else {
              // Se `existingData` não for um array, crie um novo array com os dados existentes e adicione o novo dado
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

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata={
    username:'',
    password:''
  }
  constructor(private storage: Storage) { }

  ionViewDidEnter() {
    this.storage.get('userdata')
      .then((userdata) => {
        if (userdata) {
          console.log('Dados recuperados:', userdata);
          // Faça o que for necessário com os dados recuperados
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

  Login(){
    if(this.validateInput()){
      console.log(this.userdata);
      console.log('Sucesso');
    }
    else{
      console.log("Nome de usuário ou palavra-passe inválidos!");
    }
    
  }

  validateInput(){
    if(this.userdata.username!='' && this.userdata.password!=''){
      return true;
    }
    else{
      return false;
    }
  }
}

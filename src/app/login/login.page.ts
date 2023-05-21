import { Component, OnInit } from '@angular/core';

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
  constructor() { }

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

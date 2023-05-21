import { Component, OnInit } from '@angular/core';


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
  constructor() { }

  ngOnInit() {
  }

  Register(){
    console.log(this.userdata);
  }
}

import { Component, OnInit } from '@angular/core';
/* import { FormGroup, FormBuilder, Validators } from "@angular/forms"; */
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  IHMForm: FormGroup;
  isSubmitted: boolean;
  nomeInputPreenchido = false;

  constructor() { 
    this.IHMForm = new FormGroup({
      nome:  new FormControl('', [Validators.required, Validators.minLength(2)]),

    });
    this.isSubmitted = false;
  }

  ngOnInit() {
    
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.IHMForm.valid) {
      return false;
    } else {
      console.log(this.IHMForm.value);
      return true;
    }
  }
  
  // bind (ligação) de uma propriedade de um objeto a uma função
  // quando a propriedade é "invocada" a função getter é utilizada
  get formControls() { 
    return this.IHMForm.controls;
  }

}

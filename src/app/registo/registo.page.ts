import { Component, OnInit } from '@angular/core';
/* import { FormGroup, FormBuilder, Validators } from "@angular/forms"; */
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
})
export class RegistoPage implements OnInit {

  IHMForm: FormGroup;
  isSubmitted: boolean;

  constructor() { 
    this.IHMForm = new FormGroup({
      nome:  new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      // email: new FormControl('', [Validators.required, Validators.email]),
      curso: new FormControl('', [Validators.required])
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

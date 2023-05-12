import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistoPageRoutingModule } from './registo-routing.module';

import { RegistoPage } from './registo.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistoPage]
})
export class RegistoPageModule {}

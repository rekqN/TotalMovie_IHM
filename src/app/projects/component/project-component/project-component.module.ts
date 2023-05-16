import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { SliderComponent } from '../slider/slider.component';
import { ModelPageComponent } from '../model-page/model-page.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [CardComponent, SliderComponent, ModelPageComponent],
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule

  ]
})
export class ProjectComponentModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMedidaPage } from './add-medida';

@NgModule({
  declarations: [
    AddMedidaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMedidaPage),
  ],
})
export class AddMedidaPageModule {}

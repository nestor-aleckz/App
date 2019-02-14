import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfantePage } from './infante';

@NgModule({
  declarations: [
    InfantePage,
  ],
  imports: [
    IonicPageModule.forChild(InfantePage),
  ],
})
export class InfantePageModule {}

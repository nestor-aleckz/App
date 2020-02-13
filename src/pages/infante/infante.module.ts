import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfantePage } from './infante';
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [
    InfantePage,
  ],
  imports: [
    IonicPageModule.forChild(InfantePage),
    ComponentsModule
  ],
})
export class InfantePageModule {}

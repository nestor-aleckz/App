import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule }from 'ionic-angular'
import { ComponentHeaderComponent } from './component-header/component-header';
@NgModule({
	declarations: [ComponentHeaderComponent],
	imports: [ CommonModule,IonicModule],
	exports: [ComponentHeaderComponent]
})
export class ComponentsModule {}

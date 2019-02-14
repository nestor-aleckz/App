import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList,AngularFireObject } from '@angular/fire/database';

import { Alimento } from '../../models/interfaces/ifAlimento'

/*
  Generated class for the ProvAlimentoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvAlimentoProvider {

  edadAlimts: Alimento[] = [];

  itemsRef: AngularFireList<any>;
  itemRef: AngularFireObject<any>;
  constructor(private database: AngularFireDatabase) {

    this.itemsRef =this.database.list('Alimento/');
      this.itemsRef.snapshotChanges().subscribe(
        actions => {
          actions.forEach(
            action=>{
              var alm =  {} as Alimento;
              alm.edad = action.payload.val().edad;
              alm.descripcion = action.payload.val().descripcion;
              alm.procedimiento = action.payload.val().procedimiento;
              alm.strimg = action.payload.val().strimg;
              var key : string =  action.payload.key;
              alm.key = parseInt(key);
              this.edadAlimts.push(alm);
              alm = null;
            });
        })


  }

  getFechas(){
    return this.edadAlimts;
  }



}

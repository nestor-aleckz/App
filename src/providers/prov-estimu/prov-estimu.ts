import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList,AngularFireObject } from '@angular/fire/database';

import { Crecimiento } from '../../models/interfaces/ifCrecimiento'

/*
  Generated class for the ProvEstimuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvEstimuProvider {

    lstEtapas: Crecimiento[] = [];

    itemsEta: AngularFireList<any>;
    itemsDes: AngularFireList<any>;

    constructor(private database: AngularFireDatabase) {

      this.itemsEta =this.database.list('Crecimiento/');
        this.itemsEta.snapshotChanges().subscribe(
          actions => {
            actions.forEach(
              action=>{
                var etapa =  {} as Crecimiento;
                etapa.edad = action.payload.val().edad;
                etapa.strimg = action.payload.val().strimg;
                var key : string =  action.payload.key;
                var lstDescripcion: string[]=[];
                etapa.key = parseInt(key);
                this.getDesarrollo(lstDescripcion,key)
                etapa.lstDescripcion = lstDescripcion;
                this.lstEtapas.push(etapa);
                etapa = null;
                lstDescripcion = null;
              });
          })
    }



    getDesarrollo(strDesc:string[], stretapa: string){
      this.itemsDes =this.database.list(`Estimulo/${stretapa}`);
        this.itemsDes.snapshotChanges().subscribe(
          actions => {
            actions.forEach(
              action=>{
                var descripcion : string =  action.payload.val().descripcion;
                strDesc.push(descripcion);
                descripcion = null;
              });
          })
    }

    getEtapas(){
      return this.lstEtapas;
    }

}

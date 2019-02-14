import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase , AngularFireList,AngularFireObject } from '@angular/fire/database';
import { dateObj, Evento } from '../../models/interfaces/ifEvento';
/*
  Generated class for the ProvEventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvEventoProvider {
  itemsRef: AngularFireList<any>;
  itemRef: AngularFireObject<any>;
  constructor(private database: AngularFireDatabase, private afaut : AngularFireAuth) {

  }

  getEvento(strKeyI:string){
   var eve = {} as Evento;
   var promise = new Promise((resolve, reject) =>{
     this.afaut.authState.subscribe(auth=>{
      var path = `VacunaInfante/${auth.uid}/${strKeyI}`;
      this.itemRef =this.database.object(path);
      this.itemRef.snapshotChanges().subscribe(
        action => {
          if(action.payload.val()==null){
            eve.fecha=strKeyI;
            eve.descripcion='';
            eve.evento ='';
          }else{
            eve.fecha = action.payload.val().fecha;
            eve.descripcion = action.payload.val().descripcion;
            eve.evento = action.payload.val().evento;
         }
         resolve({ objeve: eve });
        });
      });
   });
   return promise;
  }

  addEvento(strKeyI:string,objEve : Evento){
     var promise = new Promise((resolve, reject) =>{
       this.afaut.authState.subscribe(auth=>{
        this.itemsRef =this.database.list(`VacunaInfante/${auth.uid}`);
        this.itemsRef.set(objEve.fecha,objEve).then(()=>{
            resolve({ success: true });
          });
       });
    });
    return promise;
  }

  deleteEvento(key: string) {
    var promise = new Promise((resolve, reject) =>{
        this.afaut.authState.subscribe(auth=>{
         this.itemsRef =this.database.list(`VacunaInfante/${auth.uid}`);
         this.itemsRef.remove(key).then(()=>{
             resolve({ success: true });
           });
         });
     });
     return promise;
 }

}

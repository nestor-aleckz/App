import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase , AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Medida } from '../../models/interfaces/ifMedida'
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';
/*
  Generated class for the ProvInfanteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvMedidaProvider {

  itemsRef: AngularFireList<any>;
  itemRef : AngularFireObject<any>;
  items: Observable<any[]>;

  constructor(private database: AngularFireDatabase,
              private afaut : AngularFireAuth) {

  }
  getmedidas() {
    return this.items;
  }

  lstMedidas(strKeyI:string){
    this.afaut.authState.subscribe(auth=>{
        this.itemsRef =this.database.list(`Medida/${auth.uid}/${strKeyI}`,ref=> ref.orderByChild('edad').startAt('0'));
        // Use snapshotChanges().map() to store the key
        this.items = this.itemsRef.snapshotChanges().pipe( map(changes =>
            changes.map(c => ({ key:   c.payload.key, ...c.payload.val() }))
        ));
      });
    }

    getMedida(strKeyI:string, strkeyMedida : string){
      var gtMedida = {} as Medida;
      this.afaut.authState.subscribe(auth=>{
        var path = `Medida/${auth.uid}/${strKeyI}/${strkeyMedida}`;
        this.itemRef =this.database.object(path);
        this.itemRef.snapshotChanges().subscribe(
          action => {
            gtMedida.edad= action.payload.val().edad;
            gtMedida.fecha = action.payload.val().fecha;
            gtMedida.nota = action.payload.val().nota;
            gtMedida.peso = action.payload.val().peso;
            gtMedida.talla = action.payload.val().talla;
            gtMedida.lb =  action.payload.val().lb;
            gtMedida.onz = action.payload.val().onz
          });
      });
      return gtMedida;
    }

    addnewMedida(prmmedida : Medida){
      var promise = new Promise((resolve, reject) =>{
          this.itemsRef.push(prmmedida).then(()=>{
              resolve({ success: true });
            })
      });
      return promise;
    }

    updateMedida(key: string, prmmedida : Medida) {
      var promise = new Promise((resolve, reject) =>{
        this.itemsRef.update(key, prmmedida).then(()=>{
            resolve({ success: true });
          })
      });
      return promise;
    }

    deleteItem(key: string) {
      var promise = new Promise((resolve, reject) =>{
        this.itemsRef.remove(key).then(()=>{
            resolve({ success: true });
          })
      });
      return promise;
    }

}
